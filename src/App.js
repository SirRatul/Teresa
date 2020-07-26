import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './HomePage/homepage'
import Login from './Login/Login'
import Registration from './Registration/Registration'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import ForgetPasswordVerifiyCode from './ForgetPasswordVerifiyCode/ForgetPasswordVerifiyCode'
import SignUpVerifiyCode from './SignUpVerifiyCode/SignUpVerifiyCode'
import UploadPrescription from './UploadPrescription/UploadPrescription'
import ActivityManagement from './ActivityManagement/ActivityManagement'
import ResetPassword from './ResetPassword/ResetPassword'
import {AuthContext} from './shared/context/auth-context'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const auth = useContext(AuthContext)
  return <React.Fragment>
    {
      auth.isLoggedIn?
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/upload-prescription" component={UploadPrescription} exact/>
        <Route path="/set-reminder" component={ActivityManagement} exact/>
        <Redirect to="/"></Redirect>
      </Switch>
      :
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Registration} exact/>
        <Route path="/forgetPassword" component={ForgetPassword} exact/>
        <Route path="/resetPassword" component={ResetPassword} exact/>
        <Route path="/forgot-password-verification" component={ForgetPasswordVerifiyCode} exact/>
        <Route path="/sign-up-verification" component={SignUpVerifiyCode} exact/>
        <Route path="/upload-prescription" component={UploadPrescription} exact/>
        <Redirect to="/login"></Redirect>
      </Switch>
    }
  </React.Fragment>;
}

export default App;