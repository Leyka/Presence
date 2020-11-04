import { createContext, useContext } from 'react';
import { ClassroomStore } from './classroom.store';
import { UserStore } from './user.store';

export class RootStore {
  readonly userStore: UserStore;
  readonly classroomStore: ClassroomStore;
  
  constructor() {
    this.userStore = new UserStore(this);
    this.classroomStore  = new ClassroomStore(this);
  }
}

export const initialStore = new RootStore();
export const RootStoreContext = createContext(initialStore);
export const useRootStore = () => useContext(RootStoreContext);
