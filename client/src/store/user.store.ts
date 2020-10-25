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
    this.initUser();
  }

  @action async initUser() {
    try {
      const user = await UserService.getConnectedUser();
      this.fillInUser(user);
    } catch (err) {
      this.isConnected = false;
    }
  }

  @action fillInUser(user) {
    if (user) {
      this.isConnected = true;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userName = user.userName;
    }
  }
}
