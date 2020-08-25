import React from 'react';
import {Helmet} from "react-helmet";
import AdminLoginBox from './AdminLoginBox'

const AdminLogin = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Admin Login</title>
        </Helmet>
        <AdminLoginBox/>
    </React.Fragment>;
}

export default AdminLogin;