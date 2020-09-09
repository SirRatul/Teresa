import React from 'react';
import Logo from '../shared/img/teresa.png'
import InvoicePreview from '../shared/component/InvoicePreview'

const AdminInvoicePreview = props => {
    return  <div className="container">
        <div className="row">
            <div className="col-6">
                <img className="d-block teresa-logo" src={Logo} alt="Teresa Logo"/>
            </div>
            <div className="col-12 ml-5">
                <InvoicePreview medicineInfo={props.location.state.medicineInfo} sellerName={props.location.state.sellerName} sellerPhone={props.location.state.sellerPhone} prescriptionId={props.location.state.prescriptionId}/>
            </div>
        </div>
    </div>
}

export default AdminInvoicePreview;