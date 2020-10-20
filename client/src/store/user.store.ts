import { UserService } from '@/services/user.service';
import { action, computed, observable } from 'mobx';
import { RootStore } from './index';

export class UserStore {
  readonly rootStore: RootStore;

  @observable isConnected = false;
  @observable userName: string = '';
  @observable firstName: string = '';
  @observable lastName: string = '';
  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    console.log('Init new user');
    // Fill in connected user if any
    UserService.getConnectedUser().then(this.fillUser);
  }

  fillUser = (user) => {
    if (user) {
      this.isConnected = true;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userName = user.userName;
    }
  };
}
