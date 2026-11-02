import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todo.service';
import { CreateTodoRequest } from '../types/todo.types';

const todoService = new TodoService();

export class TodoController {

  getAllTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  };

  getTodoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid todo ID' });
        return;
      }
      const todo = await todoService.getTodoById(id);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // pour accéder au corps de la requête, on utilise req.body
    const todoRequest : CreateTodoRequest = req.body;
    try {
      const todo = await todoService.createTodo(todoRequest);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid todo ID' });
        return;
      }

      const updatedTodo = await todoService.updateTodo(id, req.body); 
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid todo ID' });
        return;
      }
      const deleted = await todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}