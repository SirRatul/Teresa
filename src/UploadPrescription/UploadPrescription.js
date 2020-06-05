import React from 'react';
import {Helmet} from "react-helmet";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Menu from '../shared/component/Menu'
import Footer from '../shared/component/Footer'
import UploadPrescriptionForm from './UploadPrescriptionForm'
import './UploadPrescription.css'

const UploadPrescription = () => {
    return <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Upload Prescription</title>
        </Helmet>
        <Menu/>
        <div className="container-fluid w-100 h-100 pt-5 header-background mb-5">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light ml-3 ml-lg-0 display-4 upload-prescription-header-text">Upload Prescription</p>
                </div>
                <div className="row">
                    <Breadcrumb className='ml-0 ml-lg-n3'>
                        <Breadcrumb.Item className='text-light' href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/">Buy Medicine</Breadcrumb.Item>
                        <Breadcrumb.Item active>Upload Prescription</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div>
        <UploadPrescriptionForm/>
        <Footer/>
        </React.Fragment>;
};

export default UploadPrescription;