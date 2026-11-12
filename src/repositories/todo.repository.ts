import { eq } from 'drizzle-orm';
import { todos } from '../db/schema';
import { Todo } from '../types/todo.types';
import { db } from '../db/connection';
import NotFoundError from '../errors/NotFoundError';

export class TodoRepository {

  async findAll(): Promise<Todo[]> {
    const result = await db.select().from(todos).orderBy(todos.createdAt);
    return result.map(this.mapToTodo);
  }

  async findById(id: string): Promise<Todo> {
    const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    if(result.length === 0) {
      throw new NotFoundError('Invalid todo ID');
    }
    return this.mapToTodo(result[0]);
  }

  async create(todo: Todo): Promise<Todo> {
    await db.insert(todos).values(todo);

    const result = await this.findById(todo.id);
    if (!result) {
      throw new NotFoundError('Invalid todo ID');
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // throw si le todo n'existe pas
    await db.delete(todos).where(eq(todos.id, id));
  }

  async update(id: string, todo: Partial<Todo>): Promise<Todo> {
    await this.findById(id); // throw si le todo n'existe pas
    await db.update(todos).set(todo).where(eq(todos.id, id));
    return this.findById(id) as Promise<Todo>;
  }
  
  private mapToTodo(row: any): Todo {
    return {
      id: row.id,
      text: row.text,
      isCompleted: row.isCompleted,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}