import { TodoRepository } from '../repositories/todo.repository';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo.types';
import { v4 as uuidv4 } from 'uuid';

const todoRepository = new TodoRepository();

export class TodoService {

  async getAllTodos(): Promise<Todo[]> {
    return await todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo> {
    return await todoRepository.findById(id);
  }

  async createTodo(data: CreateTodoRequest): Promise<Todo> {
  const id = uuidv4();
  const now = new Date();

  const todo: Todo = {
    id,
    text: data.text,
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  };

  return await todoRepository.create(todo);
}

  async updateTodo(id: string, data: UpdateTodoRequest) :Promise<Todo | null> {
    // Valider l'ID
    const todoToUpdate = await this.getTodoById(id);

    todoToUpdate.updatedAt = new Date();
    todoToUpdate.text = data.text;
    todoToUpdate.isCompleted = data.isCompleted;
    // Appeler le repo pour sauvegarder les changements
    await todoRepository.update(id, todoToUpdate);
    return todoToUpdate;
  }

  async deleteTodo(id: string) {
    const todoToUpdate = await this.getTodoById(id);
    await todoRepository.delete(id);
    return todoToUpdate;
  }
}

