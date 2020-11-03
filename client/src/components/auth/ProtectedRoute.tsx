import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const isDev = process.env.NODE_ENV === 'development';
  const { isConnected } = useRootStore().userStore;

  return (
    <Observer>
      {() => (
        <Route
          {...rest}
          render={(routeProps) =>
            isDev || isConnected ? <RouteComponent {...routeProps} /> : <Redirect to="/" />
          }
        />
      )}
    </Observer>
  );
};
