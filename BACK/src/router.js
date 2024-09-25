import { Router } from 'express';
const router = Router();

import homeRoutes from './routes/homeRoute.js';
import tokensRoutes from './routes/authRoute.js';
import protectedRoutes from './routes/protectedRoute.js';
import userRoutes from './routes/tokensRoute.js'

router.use([
  homeRoutes,
  userRoutes,
  tokensRoutes,
  protectedRoutes
]);

export default router;
