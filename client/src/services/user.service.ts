import axios from 'axios';

export class UserService {
  static async getConnectedUser() {
    try {
      const { data } = await axios.get('/auth/user');
      console.log({ data });
      return data;
    } catch (err) {
      if (err.response.status === 403) {
        console.log('403');
        return null;
      }
      throw err;
    }
  }
}
