import { createContext, useContext } from 'react';
import { UserStore } from './user.store';

export class RootStore {
  readonly userStore: UserStore;

  constructor() {
    this.userStore = new UserStore(this);
  }
}

export const initialStore = new RootStore();
export const RootStoreContext = createContext(initialStore);
export const useRootStore = () => useContext(RootStoreContext);
