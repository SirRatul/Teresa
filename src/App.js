import React, { useContext, useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomePage from "./HomePage/homepage";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import ForgetPasswordVerifiyCode from "./ForgetPasswordVerifiyCode/ForgetPasswordVerifiyCode";
import SignUpVerifiyCode from "./SignUpVerifiyCode/SignUpVerifiyCode";
import UploadPrescription from "./UploadPrescription/UploadPrescription";
import Profile from "./Profile/Profile";
import ActivityManagement from "./ActivityManagement/ActivityManagement";
import ResetPassword from "./ResetPassword/ResetPassword";
import AdminCreate from "./AdminCreate/AdminCreate";
import AdminLogin from "./AdminLogin/AdminLogin";
import AdminInvoiceList from "./AdminInvoiceList/AdminInvoiceList";
import MyOrders from "./MyOrders/MyOrders";
import AdminCreateInvoice from "./AdminCreateInvoice/AdminCreateInvoice";
import AdminInvoicePreview from "./AdminInvoicePreview/AdminInvoicePreview";
import { AuthContext } from "./shared/context/auth-context";
import axios from "axios";
import { Cookies } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const auth = useContext(AuthContext);
  const history = createBrowserHistory();
  useEffect(() => {
    console.log("Effect in App.js");
    const verifyToken = async () => {
      if (new Cookies().get("userId") && new Cookies().get("token")) {
        try {
          const response = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "users/check-authToken",
            {
              _id: new Cookies().get("userId"),
              token: new Cookies().get("token"),
            }
          );
          console.log(response.data);
        } catch (error) {
          console.log("Error From App.js");
          console.log(error.response.data.message);
          new Cookies().remove("userId", { path: "/" });
          new Cookies().remove("token", { path: "/" });
          new Cookies().remove("isLoggedIn", { path: "/" });
          auth.isLoggedIn = false;
          auth.userId = null;
          auth.token = null;
        }
      } else {
        new Cookies().remove("userId", { path: "/" });
        new Cookies().remove("token", { path: "/" });
        new Cookies().remove("isLoggedIn", { path: "/" });
        auth.isLoggedIn = false;
        auth.userId = null;
        auth.token = null;
      }
    };
    verifyToken();
  });
  
  return (
    <Router history={history}>
      {new Cookies().get('isLoggedIn') ? (
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/upload-prescription" component={UploadPrescription} exact/>
          <Route path="/my-orders" component={MyOrders} exact />
          <Route path="/set-reminder" component={ActivityManagement} exact />
          <Route path="/profile" component={Profile} exact />
          <Redirect to="/"></Redirect>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Registration} exact />
          <Route path="/admin-create" component={AdminCreate} exact />
          <Route path="/admin" component={AdminLogin} exact />
          <Route path="/admin-invoice-list" component={AdminInvoiceList} exact />
          <Route path="/admin-create-invoice" component={AdminCreateInvoice} exact />
          <Route path="/admin-invoice-preview" component={AdminInvoicePreview} exact />
          <Route path="/forgetPassword" component={ForgetPassword} exact />
          <Route path="/resetPassword" component={ResetPassword} exact />
          <Route path="/forgot-password-verification" component={ForgetPasswordVerifiyCode} exact />
          <Route path="/sign-up-verification" component={SignUpVerifiyCode} exact />
          <Redirect to="/login"></Redirect>
        </Switch>
      )}
    </Router>
  );
  /*return <AuthContext.Provider value={{
    isLoggedIn: auth.isLoggedIn, 
    userId: auth.userId, 
    authMessage: auth.authMessage,
    token: auth.token,
    phone: auth.phone,
    otp: auth.otp,
    medicineDetails: auth.medicineDetails,
    sellerName: auth.sellerName,
    sellerPhone: auth.sellerPhone,
    adminUserName: auth.adminUserName,
    isLoggedInAdmin: auth.isLoggedInAdmin,
    adminUserId: auth.adminUserId,
    adminToken: auth.adminToken}}>
      <BrowserRouter>
        <main>
          <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
            {routes}
          </Suspense>
        </main>
    </BrowserRouter>
  </AuthContext.Provider>;*/
};

export default App;
