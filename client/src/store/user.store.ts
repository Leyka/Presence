import { UserService } from '@/services/user.service';
import { User } from '@/types';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';

export class UserStore {
  readonly rootStore: RootStore;

  isConnected = false;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.setConnectedUser();
  }

  async setConnectedUser() {
    try {
      const user = await UserService.getConnectedUser();
      if (user) {
        this.setUser(user);
      }
    } catch (err) {
      this.isConnected = false;
    }
  }

  setUser(user: User) {
    this.isConnected = true;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
  }

  logOut() {
    console.log('TODO: Logout');
  }
}
