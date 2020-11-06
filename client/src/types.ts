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
  isAdmin: boolean;
}

export interface Classroom {
  id: number;
  name: string;
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

export interface School {
  name: string; 
  studentFirstNamePosition?: number;
  studentLastNamePosition?: number;
  classNameGroupRegexPattern?: string;
  teachers?: User[];
}