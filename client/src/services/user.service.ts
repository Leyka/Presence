import axios from 'axios';

export class UserService {
  static async getConnectedUser() {
    const { data } = await axios.get('/auth/user');
    return data;
  }
}
