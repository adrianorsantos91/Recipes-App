import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <Switch>
      <Routes />
    </Switch>
  );
}

export default App;
