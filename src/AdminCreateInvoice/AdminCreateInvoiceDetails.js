import React, {useState, useEffect, useContext} from 'react';
// import PrescriptionPhoto from '../shared/img/prescriptionPhoto.png';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import {AuthContext} from '../shared/context/auth-context'

const AdminCreateInvoiceDetails = props => {
    const auth = useContext(AuthContext)
    const [orderInfo, setOrderInfo] = useState([])
    const [dayCheck, setDayCheck] = useState(false)
    const [unitCheck, setUnitCheck] = useState(false)
    const [customerName, setCustomerName] = useState(null)
    const [customerPhone, setCustomerPhone] = useState(null)
    const authAdminAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.adminToken}`
        } 
    })
    useEffect(() => {
        const getOrderInfo = async () => {
            try {
                // console.log('Admin Token In create invoice details:'+auth.adminToken)
                const response = await authAdminAxios.post(process.env.REACT_APP_BACKEND_URL+'admin/orders/prescription', {
                    _id: props.orderId
                })
                console.log(response.data)
                setOrderInfo(response.data.message)
                setCustomerName(response.data.message.owner.firstName + " "+response.data.message.owner.lastName)
                setCustomerPhone(response.data.message.owner.phone)
                for(var i = 0; i < response.data.message.order.length; i++){
                    if(response.data.message.order[i].unit){
                        setUnitCheck(true)
                        break
                    } else {
                        setDayCheck(true)
                    }
                }
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getOrderInfo()
    }, [props.orderId, authAdminAxios])
    return  <div className="content-wrapper overflow-hidden px-3 mt-4">
        <div className="row">
            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                <img className="d-block ml-2 w-100 h-100" src={orderInfo.path} alt="Prescription"/>
            </div>
            <div className="col-12 col-lg-4 mb-3 mb-lg-0 mx-2 mx-lg-0 px-2 px-lg-0 ">
                <Table className='border border-dark'>
                    <thead>
                        <tr>
                            <th className='bg-white border border-dark'>Medicine Serial No.</th>
                            {
                                unitCheck ? 
                                <th className='bg-white border border-dark'>Unit</th>
                                :
                                <th className='bg-white border border-dark'>Day</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-dark'>
                                {
                                    orderInfo.order ?
                                    <ul style={{listStyleType: 'none'}}>
                                        {
                                            orderInfo.order.map((item, i) => {
                                                return <li className='mb-1' key={i}>{item.medicineSN}</li>;
                                            })
                                        }
                                    </ul>:
                                    null
                                }
                            </td>
                            <td className={'border '+(unitCheck ? "d-block": 'd-none')}>
                                {
                                    orderInfo.order && unitCheck ?
                                    <ul style={{listStyleType: 'none'}}>
                                        {
                                            orderInfo.order.map((item, i) => {
                                                return <li className='mb-1' key={i}>{item.unit}</li>;
                                            })
                                        }
                                    </ul>:
                                    null
                                }
                            </td>
                            <td className={'border '+(dayCheck ? "d-block": 'd-none')}>
                                {
                                    orderInfo.order && dayCheck ?
                                    <ul style={{listStyleType: 'none'}}>
                                    {
                                        orderInfo.order.map((item, i) => {
                                            return <li className='mb-1' key={i}>{item.day}</li>;
                                        })
                                    }
                                    </ul>:
                                    null
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                <p className='h4 font-weight-bold'>Additional Note</p>
                <p>{orderInfo.additionalNote}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-lg-4 mt-4 mb-3 mb-lg-0 ml-3">
                <p className='h3'>Customer Information</p>
                <p>Customer Name: {customerName}</p>
                <p>Mobile Number: {customerPhone}</p>
                <p>Address: {orderInfo.deliveryDetails}</p>
            </div>
        </div>
    </div>
}

export default AdminCreateInvoiceDetails;