import React from 'react';
import {Helmet} from "react-helmet";
import RegistrationBox from './RegistrationBox'

const Registration = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Register</title>
        </Helmet>
        <RegistrationBox/>
    </React.Fragment>;
}

export default Registration;