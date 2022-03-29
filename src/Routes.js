import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Foods } from './pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/foods" component={ Foods } />
    {/* <Route exact path="/drinks" render={ Drinks } /> */}
    {/* <Route exact path="/explore" component={ Explore } /> */}
  </Switch>
);

export default Routes;
