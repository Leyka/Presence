import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  const { userStore } = useRootStore();
  return (
    <Observer>
      {() => (
        <div>
          {userStore.isConnected && <Link to="/classrooms">Go to classroom</Link>}
          {!userStore.isConnected && <Link to="/login">Go to Login</Link>}
        </div>
      )}
    </Observer>
  );
};
