import React, {useState, useEffect, useContext} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import PlusCircle from '../shared/img/plus-circle.png';
import Form from "react-bootstrap/Form"
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import Modal from "../shared/component/Modal";
import {AuthContext} from '../shared/context/auth-context'
import './AdminCreateInvoiceForm.css'

const AdminCreateInvoiceForm = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [inputList, setInputList] = useState([
        { 
            medicineName: '', 
            unit: '', 
            day: '', 
            price: '' 
        }
    ]);
    const [orderNo, setOrderNo] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [deliveryAddress, setDeliveryAddress] = useState('')
    const [sellerName, setSellerName] = useState('')
    const [sellerPhone, setSellerPhone] = useState('')
    const [orderTime, setOrderTime] = useState('')
    const [dynamicCheckBox, setDynamicCheckBox] = useState('Unit')
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { 
            medicineName: '', 
            unit: '', 
            day: '', 
            price: '' 
        }]);
    };
    const authAdminAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.adminToken}`
        }
    })
    useEffect(() => {
        console.log('Auth')
        console.log(auth.adminToken)
        console.log(auth.medicineDetails)
        if(auth.medicineDetails){
            setInputList(auth.medicineDetails)
            setSellerName(auth.sellerName)
            setSellerPhone(auth.sellerPhone)
            for(var i = 0; i <auth.medicineDetails.length; i++){
                if(auth.medicineDetails[i].unit){
                    setDynamicCheckBox('Unit')
                    break
                } else {
                    setDynamicCheckBox('Day')
                    break
                }
            }
        }
        const getPrescriptionInfo = async () => {
            try {
                const response = await authAdminAxios.post(process.env.REACT_APP_BACKEND_URL+'admin/orders/prescription', {
                    _id: props.orderId
                })
                console.log(response.data)
                setOrderNo(response.data.message.orderNo)
                setCustomerName(response.data.message.owner.firstName + " "+response.data.message.owner.lastName)
                setCustomerPhone(response.data.message.owner.phone)
                setDeliveryAddress(response.data.message.deliveryDetails)
                setOrderTime(response.data.message.updatedAt)
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getPrescriptionInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitHandler= async (event) => {
        event.preventDefault()
        var totalPrice = 0
        inputList.forEach((item) => {
            totalPrice += parseInt(item.price)
        })
        console.log(inputList)
        console.log(totalPrice)
        console.log(sellerName)
        console.log(sellerPhone)
        console.log(props.orderId)
        console.log(props.ownerId)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await authAdminAxios.post(process.env.REACT_APP_BACKEND_URL+'admin/create-invoice', {
                medicineDetails: inputList,
                sellerInfo: {
                    sellerName,
                    sellerPhone
                },
                prescription: props.orderId,
                invoiceFor: props.ownerId,
                totalPrice
            });
            console.log(response.data);
            setIsLoading(false)
            setDisable(false)
            setInputList([{
                medicineName: '', 
                unit: '', 
                day: '', 
                price: '' 
            }])
            setSellerName("")
            setSellerPhone("")
            auth.authMessage = response.data.message
            history.push('/admin-invoice-list')
            auth.medicineDetails = null
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            console.log(error.response.data);
            setErrorMessage(error.response.data.message)
        }
    }

    const modalHandler = () => {
        setErrorMessage(null)
    };

    const previewHandler= async() => {
        auth.medicineDetails = inputList
        auth.sellerName = sellerName
        auth.sellerPhone = sellerPhone
        history.push({
            pathname: '/admin-invoice-preview',
            state:{
                medicineInfo: inputList,
                sellerName,
                sellerPhone,
                prescriptionId: props.orderId,
                customerName,
                customerPhone,
                deliveryAddress,
                orderNo,
                orderTime
            }
        })
    }
    return  <div className="content-wrapper overflow-hidden">
        <div className="row px-3 mb-3">
            <div className="col-12">
                {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
                <div className="col-12 col-lg-8">
                    <p className="h4 text-center font-weight-bold mb-4">Create Invoice</p>
                </div>
                <div className="col-12 position-relative">
                    {isLoading && <LoadingSpinner/>}
                    <Form onSubmit={submitHandler}>
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <div className="row">
                                    <div className="col-2 col-md-3 ml-3 ml-sm-5 ml-md-2 ml-lg-5 ml-xl-0">
                                    </div>
                                    <div className="col-2 col-sm-2 col-lg-3">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" id="unit" name="exampleRadios" className="custom-control-input" value="Unit" checked={dynamicCheckBox === 'Unit'} onChange={(e) => {setDynamicCheckBox('Unit')
                                            inputList.forEach(function(inputList) {
                                                inputList.day = '';
                                            })
                                            }} disabled={(disable)? "disabled" : ""}/>
                                            <label className="custom-control-label unit" htmlFor="unit">Unit</label>
                                        </div>
                                    </div>
                                    <div className="col-3 col-sm-3 ml-2 ml-sm-3 ml-lg-n2 ml-xl-0">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" id="day" name="exampleRadios" className="custom-control-input" value="Day" checked={dynamicCheckBox === 'Day'} onChange={(e) =>{ setDynamicCheckBox('Day')
                                            inputList.forEach(function(inputList) {
                                                inputList.unit = '';
                                            })
                                            }} disabled={(disable)? "disabled" : ""}/>
                                            <label className="custom-control-label day" htmlFor="day">Day</label>
                                        </div>
                                    </div>
                                </div>
                                {inputList.map((x, i) => {
                                    return (
                                        <div className="row mb-4" key={i}>
                                            <div className="col-3 col-lg-4 col-xl-form-size">
                                                <Form.Label className={"text-center " +(i > 0 ? "d-none" : "")+""+(i === 0 ? "d-block mt-n4" : "")}>Medicine Name</Form.Label>
                                                <Form.Control className={"form-control rounded-pill form-input-background "+(i === 0 ? "mt-6" : "")+" mt-medicineName"} type="text" name="medicineName" value={x.medicineName} onChange={(e) =>
                                                    handleInputChange(e, i)
                                                } required disabled={(disable)? "disabled" : ""}/>
                                            </div>
                                            <div className={"col col-xl-form-size ml-n4 ml-lg-0 "+(i === 0 ? "mt-6" : "")} style={{marginTop: '2rem'}}>
                                                <input type="text" className={"form-control rounded-pill form-input-background "+(i > 0 ? "mt-unit" : "")} name="unit" value={x.unit} onChange={e => handleInputChange(e, i)} disabled = {(dynamicCheckBox === 'Day')? "disabled" : ""} required/>
                                            </div>
                                            <div className={"col col-xl-form-size ml-n4 ml-lg-0 "+(i === 0 ? "mt-6" : "")}>
                                                <input type="text" className="form-control rounded-pill form-input-background" name="day" value={x.day} onChange={e => handleInputChange(e, i)} disabled = {(dynamicCheckBox === 'Unit')? "disabled" : ""} required/>
                                            </div>
                                            <div className="col col-xl-form-size ml-n4 ml-lg-0 mr-5 mr-lg-0">
                                                <Form.Label className={"text-center " +(i > 0 ? "d-none" : "")+""+(i === 0 ? "d-block mt-n4" : "")}>Price</Form.Label>
                                                <Form.Control className={"form-control rounded-pill form-input-background "+(i === 0 ? "mt-6" : "")} type="text" name="price" value={x.price} onChange={(e) =>
                                                    handleInputChange(e, i)
                                                } required disabled={(disable)? "disabled" : ""}/>
                                            </div>
                                            <div className="col-1 col-xl-1 ml-n3 ml-lg-0">
                                                <ButtonGroup className={"ml-n5 ml-lg-0 "+(i === 0 ? "mt-6" : "")} aria-label="Basic example" disabled={(disable)? "disabled" : ""}>
                                                    {inputList.length - 1 === i &&<img className='mr-2 plus-icon-button' src={PlusCircle} onClick={handleAddClick} alt='Plus Icon'/>}
                                                    {inputList.length !== 1 &&<i className="fas fa-minus-circle minus-icon-button" aria-hidden="true" onClick={() => handleRemoveClick(i)}></i>}
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="col-6 offset-3 col-sm-4 col-md-3 offset-sm-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 mb-4 d-none d-lg-block mt-5">
                                    <button onClick={previewHandler} className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Preview</button>
                                </div>
                                <div className="col-6 offset-3 col-sm-4 col-md-3 offset-sm-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 d-none d-lg-block">
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Create</button>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 ml-5">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="h5 mb-3 ml-2 ml-lg-0">Seller Information</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-6 col-lg-10">
                                                    <Form.Label className="d-block">Name</Form.Label>
                                                    <Form.Control className="form-control rounded-pill form-input-background" type="text" name="sellerName" value={sellerName} onChange={(e) => setSellerName(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                                </div>
                                                <div className="col-6 col-lg-10 mt-0 mt-lg-3">
                                                    <Form.Label className="d-block">Phone Number</Form.Label>
                                                    <Form.Control className="form-control rounded-pill form-input-background" type="tel" name="sellerPhone" value={sellerPhone} onChange={(e) => setSellerPhone(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 d-block d-lg-none">
                                <div className="col-6 offset-3 col-sm-4 col-md-3 offset-sm-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 mb-4">
                                    <button onClick={previewHandler} className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Preview</button>
                                </div>
                                <div className="col-6 offset-3 col-sm-4 col-md-3 offset-sm-4 offset-md-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                    <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Create</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
}

export default AdminCreateInvoiceForm;