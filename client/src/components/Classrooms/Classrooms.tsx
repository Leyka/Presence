import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { MainLayout } from '../shared/layouts/MainLayout/MainLayout';

export const Classrooms = () => {
  const { fullName } = useRootStore().userStore;
  return <Observer>{() => <MainLayout></MainLayout>}</Observer>;
};
