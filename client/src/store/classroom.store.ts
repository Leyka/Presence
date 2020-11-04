import { Classroom } from "@/types";
import { observable } from "mobx";
import { RootStore } from ".";

export class ClassroomStore {
  readonly rootStore: RootStore;
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable classrooms: Classroom[] = [];
}