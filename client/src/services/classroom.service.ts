import axios from 'axios';
import { Classroom } from '../types';

export class ClassroomService {
  static async getClassrooms() {
   try {
    const { data } = await axios.get<Classroom[]>('/api/classrooms');
    return data;
   } catch (err) {
     // TODO: Error handling
     console.log(err);
     return [];
   }
  }
}