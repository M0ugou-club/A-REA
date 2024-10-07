import { Router } from 'express';
const router = Router();

import authRoutes from './routes/authentification/authRoute.js';
import userRoutes from './routes/users/index.js';
import enumsRoutes from './routes/enums/index.js';
import tokenUserRoutes from './routes/tokens/index.js';
import routeActions from './routes/actions/index.js';
import areaRoutes from './routes/areas/index.js';

router.use([
  userRoutes,
  authRoutes,
  enumsRoutes,
  routeActions,
  tokenUserRoutes,
  areaRoutes,
]);

export default router;
