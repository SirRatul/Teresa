import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/homepage'
import Login from './Login/Login'
import Registration from './Registration/Registration'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ForgetPasswordVerifiyCode from './ForgetPasswordVerifiyCode/ForgetPasswordVerifiyCode'
import SignUpVerifiyCode from './SignUpVerifiyCode/SignUpVerifiyCode'
import ResetPassword from './ResetPassword/ResetPassword'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return <React.Fragment>
    <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Registration} exact/>
        <Route path="/forgetPassword" component={ForgetPassword} exact/>
        <Route path="/resetPassword" component={ResetPassword} exact/>
        <Route path="/forgot-password-verification" component={ForgetPasswordVerifiyCode} exact/>
        <Route path="/sign-up-verification" component={SignUpVerifiyCode} exact/>
        <Redirect to="/"></Redirect>
    </Switch>
  </React.Fragment>;
}

export default App;