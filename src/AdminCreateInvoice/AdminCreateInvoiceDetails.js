import React from 'react';
import PrescriptionPhoto from '../shared/img/prescriptionPhoto.png';
import Table from 'react-bootstrap/Table'

const AdminCreateInvoiceDetails = () => {
    return  <div className="content-wrapper overflow-hidden px-3 mt-4">
        <div className="row">
            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                <img className="d-block ml-2 w-100 h-100" src={PrescriptionPhoto} alt="Prescription"/>
            </div>
            <div className="col-12 col-lg-4 mb-3 mb-lg-0 mx-2 mx-lg-0 px-2 px-lg-0 ">
                <Table className='border border-dark'>
                    <thead>
                        <tr>
                            <th className='bg-white border border-dark'>Medicine Serial No.</th>
                            <th className='bg-white border border-dark'>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-dark'>
                                <ul style={{listStyleType: 'none'}}>
                                    <li className='mb-1'>1</li>
                                    <li className='mb-1'>2</li>
                                    <li className='mb-1'>3</li>
                                    <li className='mb-1'>4</li>
                                    <li className='mb-1'>5</li>
                                </ul>
                            </td>
                            <td className='border border-dark'>
                                <ul style={{listStyleType: 'none'}}>
                                    <li className='mb-1'>10</li>
                                    <li className='mb-1'>10</li>
                                    <li className='mb-1'>10</li>
                                    <li className='mb-1'>10</li>
                                    <li className='mb-1'>10</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                <p className='h4 font-weight-bold'>Additional Note</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-lg-4 mt-4 mb-3 mb-lg-0 ml-3">
                <p className='h3'>Customer Information</p>
                <p>Customer Name: Shahnewaz Mahmud</p>
                <p>Mobile Number: 01785499257</p>
                <p>Address: Mirbag Moor, Hatirjheel, Dhaka 1230</p>
            </div>
        </div>
    </div>
}

export default AdminCreateInvoiceDetails;