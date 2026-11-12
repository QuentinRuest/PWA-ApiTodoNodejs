import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../types/user.types';

const userService = new UserService();

export class UserController {

  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
        
        if (typeof id !== 'string') {
          res.status(400).json({ error: 'ID invalide' });
          return;
        }
      const user = await userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userRequest : CreateUserRequest = req.body;
    try {
      const user = await userService.createUser(userRequest);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(400).json({ error: 'ID invalide' });
        return;
      }
      const updatedUser = await userService.updateUser(id, req.body); 
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.status(400).json({ error: 'ID invalide' });
        return;
      }
      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }         
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}