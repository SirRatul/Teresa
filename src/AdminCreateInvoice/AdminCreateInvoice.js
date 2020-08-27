import React from 'react';
import {Helmet} from "react-helmet";
import AdminMenu from '../shared/component/AdminMenu'
import AdminSideBar from '../shared/component/AdminSideBar'
import AdminCreateInvoiceDetails from './AdminCreateInvoiceDetails'
import AdminCreateInvoiceForm from './AdminCreateInvoiceForm'

const AdminCreateInvoice = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Create Invoice</title>
        </Helmet>
        <AdminMenu/>
        <AdminSideBar/>
        <AdminCreateInvoiceDetails/>
        <AdminCreateInvoiceForm/>
    </React.Fragment>;
}

export default AdminCreateInvoice;