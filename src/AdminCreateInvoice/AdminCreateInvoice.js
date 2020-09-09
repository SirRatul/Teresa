import React from 'react';
import {Helmet} from "react-helmet";
import AdminMenu from '../shared/component/AdminMenu'
import AdminSideBar from '../shared/component/AdminSideBar'
import AdminCreateInvoiceDetails from './AdminCreateInvoiceDetails'
import AdminCreateInvoiceForm from './AdminCreateInvoiceForm'

const AdminCreateInvoice = props => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Create Invoice</title>
        </Helmet>
        <AdminMenu/>
        <AdminSideBar/>
        <AdminCreateInvoiceDetails orderId={props.location.state.orderId}/>
        <AdminCreateInvoiceForm ownerId={props.location.state.ownerId} orderId={props.location.state.orderId}/>
    </React.Fragment>;
}

export default AdminCreateInvoice;