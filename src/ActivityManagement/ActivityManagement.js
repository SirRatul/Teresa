import React from 'react';
import {Helmet} from "react-helmet";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Menu from '../shared/component/Menu'
import ActivityManagementForm from './ActivityManagementForm'
import ActivityManagementTable from './ActivityManagementTable'
import Footer from '../shared/component/Footer'
import './ActivityManagement.css'

const ActivityManagement = () => {
    return <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Activity Management</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light ml-3 ml-lg-0 display-4 activity-management-header-text">Activity Management</p>
                </div>
                <div className="row">
                    <Breadcrumb className='ml-0 ml-lg-n3'>
                        <Breadcrumb.Item className='text-light' href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Activity Management</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div>
        <ActivityManagementForm/>
        <ActivityManagementTable/>
        <Footer/>
        </React.Fragment>;
};

export default ActivityManagement;