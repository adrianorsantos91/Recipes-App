import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods } from './pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/foods" component={ Foods } />
  </Switch>
);

export default Routes;
