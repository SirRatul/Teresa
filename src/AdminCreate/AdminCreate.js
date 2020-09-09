import React from 'react';
import {Helmet} from "react-helmet";
import AdminCreateBox from './AdminCreateBox'

const AdminCreate = props => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Admin Create</title>
        </Helmet>
        <AdminCreateBox adminToken={props.location.state.adminToken}/>
    </React.Fragment>;
}

export default AdminCreate;