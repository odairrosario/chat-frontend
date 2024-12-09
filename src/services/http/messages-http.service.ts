import { api } from "./axios-config";

export interface Message {
  from: string;
  to: string;
  content: string;
}

interface SendMessageRequest {
  from: string;
  to: string;
  content: string;
}

export class MessagesHttpService {
  async getAll(): Promise<Message[]> {
    const response = await api.get('/messages');
    return response.data;
  }

  async send(data: SendMessageRequest): Promise<Message> {
    const response = await api.post('/messages', data);
    return response.data;
  }
}

export const messagesHttpService = new MessagesHttpService();