import { Credentials, User } from '@/types';
import axios from 'axios';

export class UserService {
  static async getConnectedUser() {
    // Connected user data is passed through JWT token with HTTP only cookie
    const { data } = await axios.get('/api/auth/user');
    return data;
  }

  static async login(credentials: Credentials) {
    const { data } = await axios.post<User>('/api/auth/login', {
      ...credentials,
    });
    return data;
  }
}
