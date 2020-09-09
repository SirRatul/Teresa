import React, {useState, useEffect} from 'react';
import Form from "react-bootstrap/Form"

const InvoicePreview = props => {
    const [unitCheck, setUnitCheck] = useState(false)
    const [totalPrice, setTotalPrice] = useState(null)
    useEffect(() => {
        for(var i = 0; i <props.medicineInfo.length; i++){
            if(props.medicineInfo[i].unit){
                setUnitCheck(true)
                break
            }
        }
        console.log(props.medicineInfo)
        var totalPrice = 0
        props.medicineInfo.forEach((item) => {
            totalPrice += parseInt(item.price)
        })
        setTotalPrice(totalPrice)
    }, [props.medicineInfo])
    return <React.Fragment>
        <div className="row">
            <div className='col-12 px-2 px-lg-5 ml-3'>
                <div className='col-8 offset-2 px-2 px-lg-5 ml-n4 ml-lg-5'>
                    <p className='h6 font-weight-bold ml-3'>Order No: {props.orderNo}</p>
                    <p className='ml-3'>Date and Time: {props.orderTime}</p>
                </div>
            </div>
            <div className='col-12 col-lg-1 d-none d-lg-block'>
            </div>
            <div className='col-12 col-lg-10'>
            {
                props.medicineInfo
                ?
                    props.medicineInfo.map((item, i) => {
                        return <div className="row px-2 px-lg-5 mb-3" key={i}>
                                <div className={"col-6 col-lg-5 ml-lg-0"}>
                                    <Form.Label className={"text-center "+(i === 0 ? 'd-block': 'd-none')}>Medicine Name</Form.Label>
                                    <Form.Control className="form-control rounded-pill form-input-background" type="text" name="medicineName" value={item.medicineName} readOnly/>
                            </div>
                            {
                                unitCheck ?
                                <div className={"col-3 col-lg-2 ml-n2 ml-lg-4"}>
                                    <Form.Label className={"text-center "+(i === 0 ? 'd-block': 'd-none')}>Unit</Form.Label>
                                    <Form.Control className="form-control rounded-pill form-input-background" type="text" name="unit" value={item.unit} readOnly/>
                                </div>
                                :
                                <div className={"col-3 col-lg-2 ml-n2 ml-lg-4"}>
                                    <Form.Label className={"text-center "+(i === 0 ? 'd-block': 'd-none')}>Day</Form.Label>
                                    <Form.Control className="form-control rounded-pill form-input-background" type="text" name="day" value={item.day} readOnly/>
                                </div>
                            }
                            <div className={"col-3 col-lg-2 ml-n2 ml-lg-0"}>
                                <Form.Label className={"text-center "+(i === 0 ? 'd-block': 'd-none')}>Price</Form.Label>
                                <Form.Control className="form-control rounded-pill form-input-background" type="text" name="price" value={item.price} readOnly/>
                            </div>
                        </div>;
                    })
                :
                null
            }
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
            <p className='h6 font-weight-bold ml-2'>Total: {totalPrice} BDT</p>
        </div>
        <div className='col-12 col-lg-1'>
        </div>
        <div className='col-12 col-lg-4 ml-2 mt-3'>
            <p className='h5 font-weight-bold'>Bills To</p>
            <p>Customer Name: {props.customerName}</p>
            <p>Mobile Number: {props.customerPhone}</p>
            <p>Address: {props.deliveryAddress}</p>
        </div>
        <div className='col-12 col-lg-6 ml-2 ml-lg-5 mt-3'>
            <p className='h5 font-weight-bold'>Seller Information</p>
            <p>Name: {props.sellerName}</p>
            <p>Mobile Number: {props.sellerPhone}</p>
        </div>
     </div>
    </React.Fragment>;
};

export default InvoicePreview;