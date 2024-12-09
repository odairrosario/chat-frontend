import { api } from "./axios-config";

export interface User {
  name: string;
  username: string;
}

interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

export class UsersHttpService {
  async getAll(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  }

  async create(data: CreateUserRequest): Promise<User> {
    const response = await api.post('/users', data);
    return response.data;
  }
}

export const usersHttpService = new UsersHttpService();