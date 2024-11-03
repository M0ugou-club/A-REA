import { Router } from "express";
import actions from "../../utils/actions_types.js";
import requestIp from "request-ip";
import reactions from "../../utils/reactions_types.js";

const routeAbout = Router();

const getAbout = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  const currentTime = Math.floor(Date.now() / 1000);

  const services = Object.keys(actions).map(serviceName => {
    return {
      name: serviceName,
      actions: Object.keys(actions[serviceName]).map(actionName => {
        return {
          name: actionName,
          description: actions[serviceName][actionName]
        };
      }),
      reactions: Object.keys(reactions[serviceName] || {}).map(reactionName => {
        return {
          name: reactionName,
          description: reactions[serviceName][reactionName]
        };
      })
    };
  });

  res.status(200).json({
    client: {
      host: clientIp
    },
    server: {
      current_time: currentTime,
      services: services
    }
  });
};

routeAbout.get("/about.json", getAbout);

export default routeAbout;