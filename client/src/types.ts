export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  classrooms: Classroom[];
}

export interface Classroom {
  id: number;
  group: number;
  timeStart: Date;
  timeEnd: Date;
  students: Student[];
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
}