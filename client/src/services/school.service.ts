import axios from 'axios';
import { School } from '../types';

export class SchoolService {
  static async getSchools() {
   try {
    const { data } = await axios.get<School[]>('/api/schools');
    return data;
   } catch (err) {
     // TODO: Error handling
     console.log(err);
     return [];
   }
  }
}