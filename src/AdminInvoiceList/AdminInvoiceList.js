import React, {useContext, useEffect} from 'react';
import {Helmet} from "react-helmet";
import AdminMenu from '../shared/component/AdminMenu'
import AdminSideBar from '../shared/component/AdminSideBar'
import AdminInvoiceListTable from './AdminInvoiceListTable'
import {AuthContext} from '../shared/context/auth-context'
import Modal from "../shared/component/Modal";

const AdminInvoiceList = () => {
    const auth = useContext(AuthContext)
    const modalHandler = () => {
        auth.authMessage = null
    };
    useEffect(() => {
        auth.medicineDetails =  null
        auth.sellerName = null
        auth.sellerPhone = null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return  <React.Fragment>
        {auth.authMessage &&<Modal message={auth.authMessage} onClear={modalHandler.bind(this)}/>}<Helmet>
            <meta charSet="utf-8" />
            <title>Invoice List</title>
        </Helmet>
        <AdminMenu/>
        <AdminSideBar/>
        <AdminInvoiceListTable/>
    </React.Fragment>;
}

export default AdminInvoiceList;