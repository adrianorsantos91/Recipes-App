import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ foods } />
    <Route exact path="/drinks" component={ drinks } />
    <Route exact path="/explore" component={ drinks } />
  </Switch>
);

export default Routes;
