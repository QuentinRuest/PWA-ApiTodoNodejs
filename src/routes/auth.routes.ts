import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const createAuthRoutes = (): Router => {
  
  const authController = new AuthController();
  
  const router = Router();

  router.post('/login', authController.login);
  router.post('/register', authController.register);
  return router;
};