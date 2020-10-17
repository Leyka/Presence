import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" />
      </Switch>
    </Router>
  );
};
