import React from 'react';
import Table from 'react-bootstrap/Table'
import './ActivityManagementTable.css'

const ActivityManagementTable = () => {
    return <React.Fragment>
        <div className="container-fluid" style={{backgroundColor: '#D0F2F9'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Your Activity</h1>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Medicine</h1>
                        <Table responsive striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Unit</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Continuity</th>
                                    <th>Meal</th>
                                    <th>Time</th>
                                    <th>Notification</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Napa</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>Before</td>
                                    <td>9:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Napa</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>Before</td>
                                    <td>9:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Napa</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>Before</td>
                                    <td>9:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Napa</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>Before</td>
                                    <td>9:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Diet</h1>
                        <Table responsive striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Unit</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Continuity</th>
                                    <th>Time</th>
                                    <th>Notification</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Apple</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>8:00 AM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Apple</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>8:00 AM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Apple</td>
                                    <td>1</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>8:00 AM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Exercise</h1>
                        <Table responsive striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Duration</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Continuity</th>
                                    <th>Time</th>
                                    <th>Notification</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Waliking</td>
                                    <td>30 mins</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>5:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Waliking</td>
                                    <td>30 mins</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>5:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Waliking</td>
                                    <td>30 mins</td>
                                    <td>16-05-2020</td>
                                    <td>22-05-2020</td>
                                    <td>6</td>
                                    <td>5:00 PM</td>
                                    <td>Before 15 mins</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Doctor's Schedule</h1>
                        <Table responsive striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Doctor's Name</th>
                                    <th>Place</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Notification</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dr. Ahmed</td>
                                    <td>Square Hospital</td>
                                    <td>25-06-2020</td>
                                    <td>4:00 PM</td>
                                    <td>Before 1 hour</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dr. Ahmed</td>
                                    <td>Square Hospital</td>
                                    <td>25-06-2020</td>
                                    <td>4:00 PM</td>
                                    <td>Before 1 hour</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dr. Ahmed</td>
                                    <td>Square Hospital</td>
                                    <td>25-06-2020</td>
                                    <td>4:00 PM</td>
                                    <td>Before 1 hour</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="table-row-icon"><i className="fas fa-bell-slash"></i>
                                            </button>
                                            <button type="button" className="table-row-icon"><i className="fas fa-edit"></i>
                                            </button>
                                            <button type="button" className="table-row-icon" ><i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>;
};

export default ActivityManagementTable;