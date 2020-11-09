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

  static async add(school: School) {
    try {
      const { id, ...rest} = school;
      await axios.post('/api/schools', {...rest});
    } catch(err) {
      // TODO: Err
      console.log(err);
    }
  }

  static async edit(school: School) {
    try {
      await axios.put('/api/schools', {...school});
    } catch(err) {
      // TODO: Err
      console.log(err);
    }
  }

  static async delete(schoolId: number) {
    try {
      if (schoolId) {
        await axios.delete(`/api/schools/${schoolId}`)
      }
    } catch(err) {
      // TODO: Err
      console.log(err);
    }
  }
}