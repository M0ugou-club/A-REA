import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../../models/Users/index.js";
import Area from "../../models/Area/index.js";
import Action from "../../models/Action/index.js";
import Reaction from "../../models/Reaction/index.js";
import { actionsTriggers } from "../../utils/areasService/areasTriggers.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const routeAreas = Router();

const getAreasUser = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token invalide" });
      }
      const { id } = decoded;
      const user = await User.findOne({
        _id: id,
      }).populate({
        path: "a_rea",
        populate: [{ path: "action" }, { path: "reactions" }],
      });

      if (!user) {
        return res.status(405).json({
          message: "User not found",
        });
      }

      res.status(200).json(user.a_rea);
    });
  } catch (error) {
    return next(error);
  }
};

const getActionsArea = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Area.findOne({
      _id: id,
    }).populate("action");

    if (!area) {
      return res.status(405).json({
        message: "Area not found",
      });
    }
    res.status(200).json(area.action);
  } catch (error) {
    return next(error);
  }
};

const getReactionsArea = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Area.findOne({
      _id: id,
    }).populate("reactions");

    if (!area) {
      return res.status(405).json({
        message: "Area not found",
      });
    }
    res.status(200).json(area.reactions);
  } catch (error) {
    return next(error);
  }
};

const createArea = async (req, res, next) => {
  try {
    const {
      area_title,
      area_description,
      action_name,
      action_description,
      action_type,
      action_platform,
      reaction_name,
      reaction_description,
      reaction_type,
      reaction_platform,
    } = req.body;

    const header = req.headers.authorization;
    const token = header ? header?.replace("Bearer ", "") : null;

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const action = new Action({
      title: action_name,
      description: action_description,
      type: action_type,
      platform: action_platform,
    });

    await action.save();

    const reaction = new Reaction({
      title: reaction_name,
      description: reaction_description,
      type: reaction_type,
      platform: reaction_platform,
    });

    await reaction.save();

    const area = new Area({
      title: area_title,
      description: area_description,
      update_delay: 1800,
      action: action._id,
      reactions: reaction._id,
    });

    await area.save();

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token invalide" });
      }
      const { id } = decoded;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(405).json({ message: "User not found" });
      }
      user.a_rea.push(area._id);
      await user.save();
      res.status(200).json(user.a_rea);
    });
  } catch (error) {
    return next(error);
  }
};

const deleteArea = async (req, res, next) => {
  const { id } = req.params;
  try {
    const area = await Area.findOne({
      _id: id,
    });

    area.deleted = true;
    area.save();
    res.status(200).json(area);
  } catch (error) {
    return next(error);
  }
};

const testAreas = async (req, res, next) => {
  actionsTriggers();
  return res.status(200).json({ message: "Test Areas" });
};

routeAreas.get("/areas", getAreasUser);
routeAreas.get("/areas/:id/actions", getActionsArea);
routeAreas.get("/areas/:id/reactions", getReactionsArea);
routeAreas.post("/areas", createArea);
routeAreas.delete("/areas/:id", deleteArea);
routeAreas.get("/testAreas", testAreas);

export default routeAreas;
