import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';
import m2s from 'mongoose-to-swagger';
import logger from "../../utils/logger.js";

const basePath = process.pkg
  ? path.join(__dirname)
  : path.join(__dirname, "../../src/models");

export const rawSchemas = {};

const setupSchema = (
  object,
  options = {},
  indexes = []
) => {
  const schema = new Schema(object, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    ...options
  });

  indexes.forEach(({ index, options: opts = {} }) => schema.index(index, opts));
  return schema;
};

const improveSwagger = (model, object) => {
  const swagger = m2s(model);

  Object.entries(object).forEach(([firstLvlKey, { ref, type }]) => {
    if (ref)
      swagger.properties[firstLvlKey] = {
        $ref: `#/components/schemas/${ref}`
      };
    else if (typeof type === 'object') {
      const requiredFields = [];

      delete type._id;
      Object.entries(type).forEach(([secondLvlKey, { required }]) => {
        if (required !== undefined)
          delete swagger.properties[firstLvlKey].properties[secondLvlKey]
            .required;
        if (required) requiredFields.push(secondLvlKey);
      });
      swagger.properties[firstLvlKey].required = requiredFields;
    }
  });
  return swagger;
};

const transformField = (field) => {
  const { type } = field;

  if (type) {
    if (typeof type === 'function') field.type = type.name;
  } else {
    Object.entries(field).forEach(([key, deepField]) => {
      field[key] = transformField(deepField);
    });
  }
  return field;
};

export const transformRawSchema = (rawSchema) => {
  const schema = {};

  Object.entries(rawSchema).forEach(([key, field]) => {
    schema[key] = transformField(field);
  });
  return rawSchema;
};
  
export const initModels = async () => {
  const swaggerSchemas = {};

  await Promise.all(
    fs
      .readdirSync(basePath)
      .filter(
        (modelName) =>
          !['index.js', 'index.js.map', 'schemas'].includes(modelName)
      )
      .map(async (modelName) => {
        try {
          const {
            default: object,
            options,
            pre,
            post,
            indexes
          } = await import(`./${modelName}`);

          const schema = setupSchema(
            {
              ...object,
            },
            options,
            pre,
            post,
            indexes
          );

          const model = mongoose.model(modelName, schema);
          swaggerSchemas[modelName] = improveSwagger(model, object);
          rawSchemas[modelName] = transformRawSchema(object);
        } catch (e) {
          logger.warn(`[MODELS]: Cannot load ${modelName} model: ${e.message}`);
        }
      })
  );
  logger.info('[SERVER]: Models initialized.');
  return swaggerSchemas;
};

export default mongoose.connection.models;
