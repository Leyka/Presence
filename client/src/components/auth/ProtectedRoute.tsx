import { useRootStore } from '@/store';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { isConnected } = useRootStore().userStore;

  return useObserver(() => (
    <Route
      {...rest}
      render={(routeProps) =>
        isConnected ? <RouteComponent {...routeProps} /> : <Redirect to="/" />
      }
    />
  ));
};
