import React from 'react';
import Form from "react-bootstrap/Form"

const InvoicePreview = props => {
  return <React.Fragment>
      <div className="row">
        <div className='col-12 px-2 px-lg-5 ml-3'>
            <div className='col-8 offset-2 px-2 px-lg-5 ml-n4 ml-lg-5'>
                <p className='h6 font-weight-bold ml-3'>Order No: 0012</p>
                <p className='ml-3'>Date and Time: 12-08-2020 08:00 PM</p>
            </div>
        </div>
        <div className='col-12 col-lg-1 d-none d-lg-block'>
        </div>
        <div className='col-12 col-lg-10'>
            <Form>
                <div className="row px-2 px-lg-5 mb-3">
                    <div className={"col-6 col-lg-5 ml-lg-0"}>
                        <Form.Label className="d-block text-center">Medicine Name</Form.Label>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="medicineName" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-4"}>
                        <Form.Label className="d-block text-center">Unit</Form.Label>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="unit" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-0"}>
                        <Form.Label className="d-block text-center">Price</Form.Label>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="price" readOnly/>
                    </div>
                </div>
                <div className="row px-2 px-lg-5 mb-3">
                    <div className={"col-6 col-lg-5 ml-lg-0"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="medicineName" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-4"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="unit" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-0"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="price" readOnly/>
                    </div>
                </div>
                <div className="row px-2 px-lg-5 mb-3">
                    <div className={"col-6 col-lg-5 ml-lg-0"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="medicineName" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-4"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="unit" readOnly/>
                    </div>
                    <div className={"col-3 col-lg-2 ml-n2 ml-lg-0"}>
                        <Form.Control className="form-control rounded-pill form-input-background" type="text" name="price" readOnly/>
                    </div>
                </div>
            </Form>
        </div>
     </div>
     <div className="row px-2 px-lg-5 mb-3">
        {/* <div className='col-12 col-lg-6'>
            {
                props.medicineInfo.map((item, i) => {
                    return <p key={i}>{item.medicineName}</p>
                })
            }
        </div> */}
        <div className='col-12 col-lg-7'>
        </div>
        <div className='col-12 col-lg-5'>
            <p className='h6 font-weight-bold ml-2'>Total: 265 BDT</p>
        </div>
        <div className='col-12 col-lg-1'>
        </div>
        <div className='col-12 col-lg-4 ml-2 mt-3'>
            <p className='h5 font-weight-bold'>Bills To</p>
            <p>Customer Name: Shahnewaz Mahmud</p>
            <p>Mobile Number: 01785499257</p>
            <p>Address: Mirbag Moor, Hatirjheel, Dhaka 1230</p>
        </div>
        <div className='col-12 col-lg-6 ml-2 ml-lg-5 mt-3'>
            <p className='h5 font-weight-bold'>Seller Information</p>
            <p>Name: Ayon Mahmud</p>
            <p>Mobile Number: 01785499257</p>
        </div>
     </div>
    </React.Fragment>;
};

export default InvoicePreview;