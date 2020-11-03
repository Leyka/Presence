import { useRootStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const UnauthenticatedRoute = ({ component: RouteComponent, ...rest }) => {
  const { isConnected } = useRootStore().userStore;
  return (
    <Observer>
      {() => (
        <Route
          {...rest}
          render={(routeProps) =>
            !isConnected ? <RouteComponent {...routeProps} /> : <Redirect to="/attendance" />
          }
        />
      )}
    </Observer>
  );
};
