export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTodoRequest {
  id: string;
  text: string;
}

export interface UpdateTodoRequest {
  id: string;
  isCompleted: boolean;
  text: string;
}


export interface TodoResponse {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}