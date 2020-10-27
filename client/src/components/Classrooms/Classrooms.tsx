import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';

export const Classrooms = () => {
  const { fullName } = useRootStore().userStore;
  return <Observer>{() => <div>Hello {fullName}</div>}</Observer>;
};
