import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/homepage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return <React.Fragment>
    <Switch>
        <Route path="/" component={HomePage} exact/>
        <Redirect to="/"></Redirect>
    </Switch>
  </React.Fragment>;
}

export default App;