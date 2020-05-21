import React from 'react';
import {Card}from 'react-bootstrap'
import AddGuardianIcon from '../../shared/img/addGuardianIcon.png'
import PatientRoutineIcon from '../../shared/img/patientRoutineIcon.png'
import NotificationIcon from '../../shared/img/notificationIcon.png'
import MedicineShopIcon from '../../shared/img/medicineShopIcon.png'
import ActivityManagementIcon from '../../shared/img/activityManagementIcon.png'
import './Service.css'

const Service = () => {
    return <div className="container mb-5 mt-2 pt-5">
        <p className="h1 text-center font-weight-bold mb-5" style={{color: '#19184E'}}>Our Services</p>
        <div className="row">
            <div className="col-xs-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                <Card className="serviceCard p-2 my-5">
                    <Card.Img className="mx-auto" variant="top" src={AddGuardianIcon} alt="Add Guardian Icon" style={{width: '80px', height: '65px'}}></Card.Img>
                    <Card.Body>
                        <Card.Title className="text-left">
                            <p className="h4 font-weight-bold">Add Guardian</p>
                        </Card.Title>
                        <Card.Text className="text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                <Card className="serviceCard p-2 my-5">
                    <Card.Img className="mx-auto" variant="top" src={PatientRoutineIcon} alt="Patient Routine Icon" style={{width: '60px', height: '60px'}}></Card.Img>
                    <Card.Body>
                        <Card.Title className="text-left">
                            <p className="h4 font-weight-bold">Patient Routine</p>
                        </Card.Title>
                        <Card.Text className="text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                <Card className="serviceCard p-2 my-5">
                    <Card.Img className="mx-auto" variant="top" src={NotificationIcon} alt="Notification Icon" style={{width: '50px', height: '50px'}}></Card.Img>
                    <Card.Body>
                        <Card.Title className="text-left">
                            <p className="h4 font-weight-bold">Real Time Notification</p>
                        </Card.Title>
                        <Card.Text className="text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                <Card className="serviceCard p-2 my-5">
                    <Card.Img className="mx-auto" variant="top" src={MedicineShopIcon} alt="Medicine Shop Icon" style={{width: '70px', height: '60px'}}></Card.Img>
                    <Card.Body>
                        <Card.Title className="text-left">
                            <p className="h4 font-weight-bold">Medicine Shop</p>
                        </Card.Title>
                        <Card.Text className="text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-xs-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                <Card className="serviceCard p-2 my-5">
                    <Card.Img className="mx-auto" variant="top" src={ActivityManagementIcon} alt="Activity Managemnet Icon" style={{width: '70px', height: '60px'}}></Card.Img>
                    <Card.Body>
                        <Card.Title className="text-left">
                            <p className="h4 font-weight-bold">Activity Managemnet</p>
                        </Card.Title>
                        <Card.Text className="text-left">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>;
}

export default Service;
