import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AdminRoute = ({ component: RouteComponent, ...rest }) => {
  const isDev = process.env.NODE_ENV === 'development';
  const { isConnected, isAdmin } = useRootStore().userStore;

  return (
    <Observer>
      {() => (
        <Route
          {...rest}
          render={(routeProps) =>
            isDev || (isConnected && isAdmin) ? (
              <RouteComponent {...routeProps} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      )}
    </Observer>
  );
};
