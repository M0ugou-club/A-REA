# BACK

## Models

You have to put all yours database models in the _src/models_.
Keep in mind that we use the repository name to create the Model name and also the collection name.

#### Importing

```javascript
import { Schema, Model, ObjectId } from 'mongoose';
// or
import mongoose from 'mongoose';
```

#### Defining a Model

```javascript
const BlogPost = new Schema({
  author: { type: ObjectId, ref: 'Author', required: true },
  title: { type: String, required: true },
  body: String,
  comments: [Comment],
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'] },
  date: { type: Date, default: Date.now }
});
```

#### Exporting a Model

```javascript
export default Model;
```

#### Documentation

to access the documentation swagger

- Back-End : Accessible at http://localhost:8000/api-docs

##### Route

```javascript
const getDeliveries = async ({ aqp, params }, res, next) => {
  try {
    const { filter, limit, sort, projection, population, skip } = aqp;
    const { keyword } = params;

    const adjustedFilter = {
      ...filter,
      ...(keyword ? { keywords: { $regex: keyword, $options: 'gmi' } } : {})
    };

    const articles = await Delivery.find(adjustedFilter)
      .skip(skip)
      .select(projection)
      .populate(population)
      .limit(limit)
      .sort(sort)
      .lean();

    res.setHeader('X-Total-Count', await Delivery.countDocuments({}));
    res.setHeader('X-Total-Result', articles.length);

    return res.formatter.ok(articles);
  } catch (e) {
    return next(e);
  }
};
```

#### In fact

Because of this template, to simplify & save time, to create a new Model you just have to:

1.  Create a **capital named** folder in _api/models_
2.  Create an _index.js_ file on it.
3.  Define your Model in an _export default_ object

```javascript
export default enums = {};

export default {
   name: { type: String, es_indexed: true },
    name: { type: String, es_indexed: true },
   name: { type: String, es_indexed: true },
   email: String,
    email: String,
   email: String,
   city: String,
   ref: { type: ObjectId, ref: 'User' }
}
```

Schemas, Models, plugins are dynamically loaded & applied. Keep in mind that **the name of the folder will be the name of the Schema in the documentation & the plural name of the collection in the database**. And more, you do not need to set an "updated_at' or "created_at", this is setup and updated automatically.

## Routing

Similar to the _Models_ system, you need to create a **lowercase** folder corresponding to the name of your route: e.g. _users_ for _/users_ and an _index.js_ on it.

There, you need to define an `export default` function taking the `router` as an unique parameter. From here, you can define your **Express** routing as usually.

Even more, you can specify routes which does not need token, setting the `route` path and the `methods` list.

```javascript
const getHealth = (req, res) => res.formatter.ok();

export default (router) => {
  router.route('/').get(getHealth);
};

export const withoutTokenRoutes = [{ route: '/', methods: ['GET'] }];
```

## Environment variables

- You can find a **.env.template** file of the root folder, you need to rename it in **.env** in order to makes it working properly. By default there is all basic variables needed by the micro service. All variables have default values and could be found in the **/api/utils/load-env.js** file. In your NodeJS app, you can access to these variables by simply write the variable name (_"PORT"_ for example).

- If you need to override one of this variable, **please do it in the .env file**.

- In the case of you need to add variables, add it with no value in the .env file add the default value in the load-env.js file. **Please be aware to keep the case sensitivity** & capitalize all your global variables.

A list of the variables can be found right after, **please try to keep it updated**:

| Variable name       | Current value                     | Default value                     | Description                                                                            |
| ------------------- | --------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------- |
| **PORT**            | `8000`                            | _8000_                            | The listening port of the application                                               |
| **API_URL**         | `['localhost:8000']`              | _['localhost:8000']_                     | The CORS origin list of url                                                            |
| **NODE_ENV**        | `dev`                             | _dev_                             | The environment of the application                                                    |                                                               |
| **DB_URL**          | `undefined`                       | _undefined_                       | The mongo database url                                                                 |
| **DB_NAME**         | `undefined`                       | _undefined_                       | The mongo database name                                                                |
| **DB_USERNAME**     | `undefined`                       | _undefined_                       | The mongo database username                                                            |
| **DB_PASSWORD**     | `undefined`                       | _undefined_                       | The mongo database password                                                            |
| **IS_TOKEN_ACTIVE** | `true`                            | _true_                            | Flag to active token protection, "false" value allowing to bypass all protected routes |
