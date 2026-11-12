export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}