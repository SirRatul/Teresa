import React, {useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import QualityRanger from './QualityRanger';
import TimeInputEditable from './TimeInputEditable';
import './ActivityManagementTable.css'

const ActivityManagementTable = () => {
    const [searchId, setSearchId] = useState(null)
    const [editButtonShow, setEditButtonShow] = useState(false)
    const [medicineData, setMedicineData] = useState([
        {
            _id: 1,
            item: 'Napa',
            unit: 1,
            startDate: '16-05-2020',
            endDate: '22-05-2020',
            continuity: 6,
            meal: 'Before',
            time: '9:00 PM',
            notification: 'Before 15 mins'
        },
        {
            _id: 2,
            item: 'Napa',
            unit: 1,
            startDate: '16-05-2020',
            endDate: '22-05-2020',
            continuity: 6,
            meal: 'Before',
            time: '9:00 PM',
            notification: 'Before 15 mins'
        },
        {
            _id: 3,
            item: 'Napa',
            unit: 1,
            startDate: '16-05-2020',
            endDate: '22-05-2020',
            continuity: 6,
            meal: 'Before',
            time: '9:00 PM',
            notification: 'Before 15 mins'
        },
        {
            _id: 4,
            item: 'Napa',
            unit: 1,
            startDate: '16-05-2020',
            endDate: '22-05-2020',
            continuity: 6,
            meal: 'Before',
            time: '9:00 PM',
            notification: 'Before 15 mins'
        }
    ])
    const setSearchIdThroughFunction = (id) => {
        setSearchId(id)
        console.log('setSearchIdThroughFunction')
    }
    const setEditButtonShowThroughFunction = () => {
        setEditButtonShow(!editButtonShow)
        console.log('setEditButtonShowThroughFunction')
    }
    useEffect(() => {
        console.log('effect')
        console.log(searchId)
    }, [searchId])
    useEffect(() => {
        console.log('effect 2')
        console.log('editButtonShow'+editButtonShow)
    }, [editButtonShow])
    const notificationButtonFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
                <button type="button" className="table-row-icon" onClick={function() {
                    console.log('Notification Icon Edit For Row '+row._id)
                }}>
                    <i className="fas fa-bell-slash"></i>
                </button>
        </React.Fragment>;
    }
    const editButtonFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={"table-row-icon "+(editButtonShow ? "d-none" : null)} onClick={function() {
                    setEditButtonShow(true)
                    setSearchId(row._id)
                    console.log('editButtonShow'+editButtonShow)
                    console.log('searchId'+searchId)
                    console.log('test1')
                }}>
                    <i className="fas fa-edit"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow ? "d-inline" : "d-none")} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test2 in activity')
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button type="button" className={"table-row-icon "+(!editButtonShow ? "d-none" : null)} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test3 in activity')
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
            </div>
        </React.Fragment>;
    }
    const deleteButtonFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <button type="button" className="table-row-icon" onClick={function() {
                console.log('Delete Row '+row._id)
            }}>
                <i className="fas fa-trash"></i>
            </button>
        </React.Fragment>;
    }
    const medicineTableColumns = [
        {
            dataField: '_id',
            text: 'Id'
            /* hidden: true,
            headerStyle: {
                width: '0%'
            } */
        },
        {
            dataField: 'item',
            text: 'Item',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId
        }, 
        {
            dataField: 'unit',
            text: 'Unit',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                  return {
                    valid: false,
                    message: 'Unit should be numeric'
                  };
                }
                return true;
            }
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editor: {
                type: Type.DATE
            },
            validator: (newValue, row, column) => {
                if (!newValue){
                  return {
                    valid: false,
                    message: 'Start Date must enter'
                  };
                }
                return true;
            }
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editor: {
                type: Type.DATE
            },
            validator: (newValue, row, column) => {
                if (!newValue){
                  return {
                    valid: false,
                    message: 'End Date must enter'
                  };
                }
                return true;
            }
        },
        {
            dataField: 'continuity',
            text: 'Continuity',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                  return {
                    valid: false,
                    message: 'Continuity should be numeric'
                  };
                }
                return true;
            }
        },
        {
            dataField: 'meal',
            text: 'Meal',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editor: {
                type: Type.SELECT,
                options: [{
                  value: 'Before',
                  label: 'Before'
                }, {
                  value: 'After',
                  label: 'After'
                }]
            }
        },
        {
            dataField: 'time',
            text: 'Time',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <TimeInputEditable { ...editorProps } value={ value } />
            ),
            validator: (newValue, row, column) => {
                if (!newValue){
                  return {
                    valid: false,
                    message: 'Time must enter'
                  };
                }
                return true;
            }
        },
        {
            dataField: 'notification',
            text: 'Notification',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 'Before 15 mins',
                        label: 'Before 15 mins'
                    }, 
                    {
                        value: 'Before 30 mins',
                        label: 'Before 30 mins'
                    }, 
                    {
                        value: 'Before 1 hour',
                        label: 'Before 1 hour'
                    }
                ]
            }
        },
        { 
            dataField: "notificationIcon", 
            text: "Action",
            formatter: notificationButtonFormatter,
            editable: false,
            headerAttrs: { 
                colSpan: 3
            },
            headerAlign: 'center'
        },
        { 
            dataField: "edit", 
            text: "Action",
            formatter: editButtonFormatter,
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <QualityRanger { ...editorProps } value={ value } id={row._id} setSearchIdThroughFunction={setSearchIdThroughFunction.bind(this)} setEditButtonShowThroughFunction={setEditButtonShowThroughFunction.bind(this)} />
            ),
            headerClasses: 'd-none'
        },
        { 
            dataField: "delete", 
            text: "Action",
            formatter: deleteButtonFormatter,
            editable: false,
            headerClasses: 'd-none'
        }
    ];

    
    return <React.Fragment>
        <div className="container-fluid" style={{backgroundColor: '#D0F2F9'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Your Activity</h1>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <BootstrapTable
                            keyField='_id'
                            data={medicineData}
                            columns={medicineTableColumns}
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, autoSelectText: true }) }
                            /* cellEdit={ cellEditFactory({
                                    mode: 'click',
                                    onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                        console.log('start to edit!!!'); 
                                        console.log(row);
                                    },
                                    beforeSaveCell: (oldValue, newValue, row, column) => {
                                        console.log('Before Saving Cell!!'); 
                                        console.log(oldValue);
                                        console.log(newValue);
                                        console.log(row);
                                    },
                                    afterSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('After Saving Cell!!');
                                        console.log(oldValue);
                                        console.log(newValue);
                                        console.log(row);
                                    }
                                }) 
                            } */
                        />
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