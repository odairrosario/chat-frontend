import { api } from "./axios-config";

interface LoginResponse {
  name: string;
  username: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export class AuthHttpService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post('/auth/login', data, {
      withCredentials: true,
    });
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout', {}, {
      withCredentials: true,
    });
  }
}

export const authHttpService = new AuthHttpService();