import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Schools } from './components/Admin/Schools/Schools';
import { Attendance } from './components/Attendance/Attendance';
import { AdminRoute } from './components/auth/AdminRoute';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Classrooms } from './components/Classrooms/Classrooms';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Welcome } from './components/Welcome/Welcome';
import { initialStore, RootStoreContext } from './store';

export const App = () => {
  useEffect(() => {
    const setCsrfToken = async () => {
      const { data } = await axios.get('/api/auth/csrf');
      axios.defaults.headers.common['X-CSRF-Token'] = data;
    };
    setCsrfToken();
  }, []);

  return (
    <RootStoreContext.Provider value={initialStore}>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/attendance" component={Attendance} />
          <ProtectedRoute exact path="/classrooms" component={Classrooms} />
          <AdminRoute exact path="/admin/schools" component={Schools} />
        </Switch>
      </Router>
    </RootStoreContext.Provider>
  );
};
