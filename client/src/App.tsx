import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { initialStore, RootStoreContext } from './store';

export const App = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/auth/csrf');
      axios.defaults.headers.common['X-CSRF-Token'] = data;
    };
    getCsrfToken();
  }, []);

  return (
    <RootStoreContext.Provider value={initialStore}>
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/classrooms" />
        </Switch>
      </Router>
    </RootStoreContext.Provider>
  );
};
