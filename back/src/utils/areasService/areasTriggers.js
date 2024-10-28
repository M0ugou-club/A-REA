import User from "../../models/Users/index.js";
import { reactionService } from "./reactionsService/reactionsService.js";
import { actionsChanges } from "./actionsService/actionsService.js";

export const actionsTriggers = async () => {
  const datasObject = {};

  const users = await User.find().populate({
    path: "a_rea",
    populate: [{ path: "action" }, { path: "reactions" }],
  });

  users.forEach(async (user) => {
    user.a_rea.forEach(async (area) => {
      if (
        (await actionsChanges(
          area.action.platform,
          area.action.type,
          area.action.data,
          user._id,
          area.action._id
        )) === true
      ) {
        reactionService(area.reactions.platform, area.reactions.type, user.id);
      }
    });
  });
};

export default { actionsTriggers };
