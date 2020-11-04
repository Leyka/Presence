import { useRootStore } from '@/store';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const Register = () => {
  const { userStore } = useRootStore();

  // Redirect if already connected
  if (userStore.isConnected) {
    return <Redirect to="/attendance" />;
  }

  return <div>Register</div>;
};
