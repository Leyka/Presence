import { UserService } from '@/services/user.service';
import { User } from '@/types';
import { makeAutoObservable } from 'mobx';
import { RootStore } from './index';

export class UserStore {
  readonly rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.setConnectedUser();
  }

  isConnected = false;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  isAdmin: boolean = false;
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  private async setConnectedUser() {
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
    this.isAdmin = user.isAdmin;
  }

  logOut = () => {
    this.isConnected = false;
    // TODO: Clear session in backend
    console.log('TODO: Logout');
  }
}
