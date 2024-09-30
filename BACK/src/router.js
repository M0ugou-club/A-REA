import { Router } from 'express';
const router = Router();

import homeRoutes from './routes/homeRoute.js';
import tokensRoutes from './routes/authRoute.js';
import userRoutes from './routes/tokensRoute.js'

router.use([
  homeRoutes,
  userRoutes,
  tokensRoutes
]);

export default router;
