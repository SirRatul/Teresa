import React, {useEffect, useContext} from 'react';
import {Helmet} from "react-helmet";
import AdminCreateBox from './AdminCreateBox'
import {AuthContext} from '../shared/context/auth-context'

const AdminCreate = props => {
    const auth = useContext(AuthContext)
    useEffect(() => {
        auth.medicineDetails =  null
        auth.sellerName = null
        auth.sellerPhone = null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Admin Create</title>
        </Helmet>
        <AdminCreateBox adminToken={props.location.state.adminToken}/>
    </React.Fragment>;
}

export default AdminCreate;