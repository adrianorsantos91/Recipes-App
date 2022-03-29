import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks, Explore } from './pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/foods" component={ Foods } />
    <Route path="/drinks" component={ Drinks } />
    <Route path="/explore" component={ Explore } />
  </Switch>
);

export default Routes;
