import React from 'react';
import {Helmet} from "react-helmet";
import AdminMenu from '../shared/component/AdminMenu'
import AdminSideBar from '../shared/component/AdminSideBar'
import AdminInvoiceListTable from './AdminInvoiceListTable'

const AdminInvoiceList = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Invoice List</title>
        </Helmet>
        <AdminMenu/>
        <AdminSideBar/>
        <AdminInvoiceListTable/>
    </React.Fragment>;
}

export default AdminInvoiceList;