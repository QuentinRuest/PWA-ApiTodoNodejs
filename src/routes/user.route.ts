import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const createUserRoutes = (): Router => {
  
  const userController = new UserController();
  
  const router = Router();

  router.get('/users', userController.getAllUsers);
  router.get('/user/:id', userController.getUserById);
  router.post('/user', userController.createUser);
  router.patch('/user/:id', userController.updateUser);
  router.delete('/user/:id', userController.deleteUser);
  // Ajouter les routes pour le patch et le delete
  return router;
};