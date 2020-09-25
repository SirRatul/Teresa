import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import EditableButtonForMedicine from './EditableButtonForMedicine';
import EditableButtonForDiet from './EditableButtonForDiet';
import EditableButtonForExercise from './EditableButtonForExercise';
// import EditableButtonForDoctorsSchedule from './EditableButtonForDoctorsSchedule';
import TimeInputEditable from './TimeInputEditable';
import {AuthContext} from '../shared/context/auth-context'
import moment from 'moment'
import {Cookies} from 'react-cookie';
import './ActivityManagementTable.css'

const ActivityManagementTable = props => {
    const auth = useContext(AuthContext)
    const cookies = new Cookies();
    const [renderPage, setRenderPage] = useState(false)
    const [searchId, setSearchId] = useState(null)
    const [editButtonShow, setEditButtonShow] = useState(false)
    const [medicineData, setMedicineData] = useState([])
    const [dietData, setDietData] = useState([])
    const [exerciseData, setExerciseData] = useState([])
    /*const [doctorsScheudleData, setDoctorsScheudleData] = useState([
        {
            _id: 1,
            doctorsName: "Dr. Ahmed",
            place: "Square Hospital",
            date: "2020-06-25",
            time: "04:00 pm",
            notification: true,
            notificationBefore: 60
        },
        {
            _id: 2,
            doctorsName: "Dr. Ahmed",
            place: "Square Hospital",
            date: "2020-06-25",
            time: "04:00 pm",
            notification: true,
            notificationBefore: 60
        },
        {
            _id: 3,
            doctorsName: "Dr. Ahmed",
            place: "Square Hospital",
            date: "2020-06-25",
            time: "04:00 pm",
            notification: true,
            notificationBefore: 60
        }
    ])*/
    const setSearchIdThroughFunction = (id) => {
        setSearchId(id)
        console.log('setSearchIdThroughFunction')
    }
    const setEditButtonShowThroughFunction = () => {
        setEditButtonShow(!editButtonShow)
        console.log('setEditButtonShowThroughFunction')
    }
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        } 
    })
    const pageRender = () => {
        setRenderPage(!renderPage)
    }

    const getRoutine = async () => {
        try {
            const response = await authAxios.get('routines/me')
            console.log('response.data')
            console.log(response.data)
            setMedicineData(response.data.message.medicine)
            setDietData(response.data.message.diet)
            setExerciseData(response.data.message.exercise)
        } catch (error) {
            console.log(error.response.data.message);
            if(error.response.data.error === 'Please authenticate'){
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                    _id: auth.userId
                });
                console.log(response.data)
                auth.token = response.data.token
                cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                const authAxiosChange = axios.create({
                    baseURL: process.env.REACT_APP_BACKEND_URL,
                    headers: {
                        Authorization : `Bearer ${response.data.token}`
                    } 
                })
                try {
                    const response = await authAxiosChange.get('routines/me')
                    console.log('response.data');
                    console.log(response.data);
                    setMedicineData(response.data.message.medicine)
                    setDietData(response.data.message.diet)
                    setExerciseData(response.data.message.exercise)
                } catch (error) {
                    console.log(error.response.data);
                }
            }
        }
    }
    
    useEffect(() => {
        console.log('effect page render')
        getRoutine()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [renderPage])
    useEffect(() => {
        console.log('effect page render')
        getRoutine()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.renderPageParent]) 
    useEffect(() => {
        console.log('effect')
        console.log(searchId)
    }, [searchId])
    useEffect(() => {
        console.log('effect 2')
        console.log('editButtonShow'+editButtonShow)
    }, [editButtonShow])
    const startDateFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <p>{row.startDate.substring(0, 10)}</p>
        </React.Fragment>;
    }
    /*const dateFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <p>{row.date.substring(0, 10)}</p>
        </React.Fragment>;
    }*/
    const endDateFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <p>{row.endDate.substring(0, 10)}</p>
        </React.Fragment>;
    }
    const continuityFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <p>{moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1}</p>
        </React.Fragment>;
    }
    const timeFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {/* <p>{moment(row.time).format("hh:mm A")}</p> */}
            <p>{row.time}</p>
        </React.Fragment>;
    }
    const notificationTimeBeforeFormatter = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {
                row.notificationBefore === 15 || row.notificationBefore === '15' ?
                    <p>Before 15 mins </p>
                :
                row.notificationBefore === 30 || row.notificationBefore === '30' ?
                    <p>Before 30 mins</p>
                :
                row.notificationBefore === 60 || row.notificationBefore === '60' ?
                    <p>Before 1 hour</p>
                :
                <p>Before {row.notificationBefore} mins</p>
            }
        </React.Fragment>;
    }
    const notificationButtonFormatterForMedicine = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {
                row.notification ?
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/medicine/'+row._id,{
                            notification: false
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/medicine/'+row._id,{
                                    notification: false
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell"></i>
                </button>
                :
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/medicine/'+row._id,{
                            notification: true
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/medicine/'+row._id,{
                                    notification: true
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell-slash"></i>
                </button>
            }
        </React.Fragment>;
    }
    const notificationButtonFormatterForDiet = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {
                row.notification ?
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/diet/'+row._id,{
                            notification: false
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/diet/'+row._id,{
                                    notification: false
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell"></i>
                </button>
                :
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/diet/'+row._id,{
                            notification: true
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/diet/'+row._id,{
                                    notification: true
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell-slash"></i>
                </button>
            }
        </React.Fragment>;
    }
    const notificationButtonFormatterForExercise = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {
                row.notification ?
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/exercise/'+row._id,{
                            notification: false
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/exercise/'+row._id,{
                                    notification: false
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell"></i>
                </button>
                :
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/exercise/'+row._id,{
                            notification: true
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/exercise/'+row._id,{
                                    notification: true
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell-slash"></i>
                </button>
            }
        </React.Fragment>;
    }
    /*const notificationButtonFormatterForDoctorsSchedule = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            {
                row.notification ?
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/'+row._id,{
                            notification: false
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/'+row._id,{
                                    notification: false
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell"></i>
                </button>
                :
                <button type="button" className="table-row-icon" onClick={async() => {
                    console.log('Notification Icon Edit For Row '+row._id)
                    try {
                        const response = await authAxios.patch('routines/'+row._id,{
                            notification: true
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/'+row._id,{
                                    notification: true
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-bell-slash"></i>
                </button>
            }
        </React.Fragment>;
    }*/
    const editButtonFormatterForMedicine = (cell, row, rowIndex, formatExtraData) => { 
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
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={async() => {
                    setEditButtonShow(false)
                    // setSearchId(null)
                    if(searchId === row._id){
                        console.log('search id and row id match')
                    } else {
                        // setEffectController(!effectController)
                        setSearchId(null)
                        console.log('search id and row id different')
                        setSearchId(null)
                    }
                    setSearchIdThroughFunction(null)
                    console.log('test2 in activity')
                    console.log('search id'+searchId)
                    console.log(row)
                    try {
                        const response = await authAxios.patch('routines/medicine/'+row._id,{
                            startDate: moment(row.startDate).format("YYYY-MM-DD"),
                            endDate: moment(row.endDate).format("YYYY-MM-DD"),
                            continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                            meal: row.meal,
                            time: row.time,
                            unit: row.unit,
                            notificationBefore: row.notificationBefore
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/medicine/'+row._id,{
                                    startDate: moment(row.startDate).format("YYYY-MM-DD"),
                                    endDate: moment(row.endDate).format("YYYY-MM-DD"),
                                    continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                                    meal: row.meal,
                                    time: row.time,
                                    unit: row.unit,
                                    notificationBefore: row.notificationBefore
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test3 in activity')
                    pageRender()
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId !== row._id ? "d-inline" : "d-none")} onClick={function() {
                    console.log('test4 in activity')
                    setEditButtonShow(true)
                    setSearchId(row._id)
                    console.log('editButtonShow'+editButtonShow)
                    console.log('searchId'+searchId)
                    console.log('test4')
                }}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </React.Fragment>;
    }
    const editButtonFormatterForDiet = (cell, row, rowIndex, formatExtraData) => { 
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
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={async() => {
                    setEditButtonShow(false)
                    // setSearchId(null)
                    if(searchId === row._id){
                        console.log('search id and row id match')
                    } else {
                        // setEffectController(!effectController)
                        setSearchId(null)
                        console.log('search id and row id different')
                        setSearchId(null)
                    }
                    setSearchIdThroughFunction(null)
                    console.log('test2 in activity')
                    console.log('search id'+searchId)
                    console.log(row)
                    try {
                        const response = await authAxios.patch('routines/diet/'+row._id,{
                            startDate: moment(row.startDate).format("YYYY-MM-DD"),
                            endDate: moment(row.endDate).format("YYYY-MM-DD"),
                            continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                            time: row.time,
                            unit: row.unit,
                            notificationBefore: row.notificationBefore
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/diet/'+row._id,{
                                    startDate: moment(row.startDate).format("YYYY-MM-DD"),
                                    endDate: moment(row.endDate).format("YYYY-MM-DD"),
                                    continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                                    time: row.time,
                                    unit: row.unit,
                                    notificationBefore: row.notificationBefore
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test3 in activity')
                    pageRender()
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId !== row._id ? "d-inline" : "d-none")} onClick={function() {
                    console.log('test4 in activity')
                    setEditButtonShow(true)
                    setSearchId(row._id)
                    console.log('editButtonShow'+editButtonShow)
                    console.log('searchId'+searchId)
                    console.log('test4')
                }}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </React.Fragment>;
    }
    const editButtonFormatterForExercise = (cell, row, rowIndex, formatExtraData) => { 
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
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={async() => {
                    setEditButtonShow(false)
                    // setSearchId(null)
                    if(searchId === row._id){
                        console.log('search id and row id match')
                    } else {
                        // setEffectController(!effectController)
                        setSearchId(null)
                        console.log('search id and row id different')
                        setSearchId(null)
                    }
                    setSearchIdThroughFunction(null)
                    console.log('test2 in activity')
                    console.log('search id'+searchId)
                    console.log(row)
                    try {
                        const response = await authAxios.patch('routines/exercise/'+row._id,{
                            startDate: moment(row.startDate).format("YYYY-MM-DD"),
                            endDate: moment(row.endDate).format("YYYY-MM-DD"),
                            continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                            time: row.time,
                            duration: row.duration,
                            notificationBefore: row.notificationBefore
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/exercise/'+row._id,{
                                    startDate: moment(row.startDate).format("YYYY-MM-DD"),
                                    endDate: moment(row.endDate).format("YYYY-MM-DD"),
                                    continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                                    time: row.time,
                                    duration: row.duration,
                                    notificationBefore: row.notificationBefore
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test3 in activity')
                    pageRender()
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId !== row._id ? "d-inline" : "d-none")} onClick={function() {
                    console.log('test4 in activity')
                    setEditButtonShow(true)
                    setSearchId(row._id)
                    console.log('editButtonShow'+editButtonShow)
                    console.log('searchId'+searchId)
                    console.log('test4')
                }}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </React.Fragment>;
    }
    /*const editButtonFormatterForDoctorsSchedule = (cell, row, rowIndex, formatExtraData) => { 
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
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={async() => {
                    setEditButtonShow(false)
                    // setSearchId(null)
                    if(searchId === row._id){
                        console.log('search id and row id match')
                    } else {
                        // setEffectController(!effectController)
                        setSearchId(null)
                        console.log('search id and row id different')
                        setSearchId(null)
                    }
                    setSearchIdThroughFunction(null)
                    console.log('test2 in activity')
                    console.log('search id'+searchId)
                    console.log(row)
                    try {
                        const response = await authAxios.patch('routines/'+row._id,{
                            startDate: moment(row.startDate).format("YYYY-MM-DD"),
                            endDate: moment(row.endDate).format("YYYY-MM-DD"),
                            continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                            meal: row.meal,
                            time: row.time,
                            unit: row.unit,
                            notificationBefore: row.notificationBefore
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                        if(error.response.data.error === 'Please authenticate'){
                            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                                _id: auth.userId
                            });
                            console.log(response.data)
                            auth.token = response.data.token
                            cookies.set('token', auth.token, { path: '/', maxAge: 31536000 })
                            const authAxiosChange = axios.create({
                                baseURL: process.env.REACT_APP_BACKEND_URL,
                                headers: {
                                    Authorization : `Bearer ${response.data.token}`
                                } 
                            })
                            try {
                                const response = await authAxiosChange.patch('routines/'+row._id,{
                                    startDate: moment(row.startDate).format("YYYY-MM-DD"),
                                    endDate: moment(row.endDate).format("YYYY-MM-DD"),
                                    continuity: moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1,
                                    meal: row.meal,
                                    time: row.time,
                                    unit: row.unit,
                                    notificationBefore: row.notificationBefore
                                })
                                console.log('response.data');
                                console.log(response.data);
                            } catch (error) {
                                console.log(error.response.data);
                            }
                        }
                    }
                    pageRender()
                }}>
                    <i className="fas fa-check"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId === row._id ? "d-inline" : "d-none")} onClick={function() {
                    setEditButtonShow(false)
                    setSearchId(null)
                    console.log('test3 in activity')
                    pageRender()
                }}>
                    <i className="fas fa-window-close"></i>
                </button>
                <button type="button" className={"table-row-icon "+(editButtonShow & searchId !== row._id ? "d-inline" : "d-none")} onClick={function() {
                    console.log('test4 in activity')
                    setEditButtonShow(true)
                    setSearchId(row._id)
                    console.log('editButtonShow'+editButtonShow)
                    console.log('searchId'+searchId)
                    console.log('test4')
                }}>
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </React.Fragment>;
    }*/
    const deleteButtonFormatterForMedicine = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <button type="button" className="table-row-icon" onClick={async() => {
                console.log('Delete Row '+row._id)
                try {
                    const response = await authAxios.delete('routines/medicine/'+row._id)
                    console.log('response.data');
                    console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                    if(error.response.data.error === 'Please authenticate'){
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                            _id: auth.userId
                        });
                        console.log(response.data)
                        auth.token = response.data.token
                        cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                        const authAxiosChange = axios.create({
                            baseURL: process.env.REACT_APP_BACKEND_URL,
                            headers: {
                                Authorization : `Bearer ${response.data.token}`
                            } 
                        })
                        try {
                            const response = await authAxiosChange.delete('routines/medicine/'+row._id)
                            console.log('response.data');
                            console.log(response.data);
                        } catch (error) {
                            console.log(error.response.data);
                        }
                    }
                }
                pageRender()
            }}>
                <i className="fas fa-trash"></i>
            </button>
        </React.Fragment>;
    }
    const deleteButtonFormatterForDiet = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <button type="button" className="table-row-icon" onClick={async() => {
                console.log('Delete Row '+row._id)
                try {
                    const response = await authAxios.delete('routines/diet/'+row._id)
                    console.log('response.data');
                    console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                    if(error.response.data.error === 'Please authenticate'){
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                            _id: auth.userId
                        });
                        console.log(response.data)
                        auth.token = response.data.token
                        cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                        const authAxiosChange = axios.create({
                            baseURL: process.env.REACT_APP_BACKEND_URL,
                            headers: {
                                Authorization : `Bearer ${response.data.token}`
                            } 
                        })
                        try {
                            const response = await authAxiosChange.delete('routines/diet/'+row._id)
                            console.log('response.data');
                            console.log(response.data);
                        } catch (error) {
                            console.log(error.response.data);
                        }
                    }
                }
                pageRender()
            }}>
                <i className="fas fa-trash"></i>
            </button>
        </React.Fragment>;
    }
    const deleteButtonFormatterForExercise = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <button type="button" className="table-row-icon" onClick={async() => {
                console.log('Delete Row '+row._id)
                try {
                    const response = await authAxios.delete('routines/exercise/'+row._id)
                    console.log('response.data');
                    console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                    if(error.response.data.error === 'Please authenticate'){
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                            _id: auth.userId
                        });
                        console.log(response.data)
                        auth.token = response.data.token
                        cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                        const authAxiosChange = axios.create({
                            baseURL: process.env.REACT_APP_BACKEND_URL,
                            headers: {
                                Authorization : `Bearer ${response.data.token}`
                            } 
                        })
                        try {
                            const response = await authAxiosChange.delete('routines/exercise/'+row._id)
                            console.log('response.data');
                            console.log(response.data);
                        } catch (error) {
                            console.log(error.response.data);
                        }
                    }
                }
                pageRender()
            }}>
                <i className="fas fa-trash"></i>
            </button>
        </React.Fragment>;
    }
    /*const deleteButtonFormatterForDoctorsSchedule = (cell, row, rowIndex, formatExtraData) => { 
        return <React.Fragment>
            <button type="button" className="table-row-icon" onClick={async() => {
                console.log('Delete Row '+row._id)
                try {
                    const response = await authAxios.delete('routines/'+row._id)
                    console.log('response.data');
                    console.log(response.data);
                } catch (error) {
                    console.log(error.response.data);
                    if(error.response.data.error === 'Please authenticate'){
                        const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/refresh-token', {
                            _id: auth.userId
                        });
                        console.log(response.data)
                        auth.token = response.data.token
                        cookies.set('token', auth.token, { path: '/', maxAge: 31536000 });
                        const authAxiosChange = axios.create({
                            baseURL: process.env.REACT_APP_BACKEND_URL,
                            headers: {
                                Authorization : `Bearer ${response.data.token}`
                            } 
                        })
                        try {
                            const response = await authAxiosChange.delete('routines/'+row._id)
                            console.log('response.data');
                            console.log(response.data);
                        } catch (error) {
                            console.log(error.response.data);
                        }
                    }
                }
                pageRender()
            }}>
                <i className="fas fa-trash"></i>
            </button>
        </React.Fragment>;
    }*/

    const medicineTableColumns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        },
        {
            dataField: 'itemName',
            text: 'Item',
            editable: false
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
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: startDateFormatter,
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
                if(!moment(newValue).isSameOrBefore(row.endDate)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                console.log(row.endDate)
                console.log(row.startDate)
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                console.log(row.continuity)
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: endDateFormatter,
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
                if(!moment(row.startDate).isSameOrBefore(newValue)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'continuity',
            text: 'Continuity',
            // editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editable: false,
            formatter: continuityFormatter,
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
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'time',
            text: 'Time',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: timeFormatter,
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
            dataField: 'notificationBefore',
            text: 'Notification',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: notificationTimeBeforeFormatter,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 15,
                        label: 'Before 15 mins'
                    }, 
                    {
                        value: 30,
                        label: 'Before 30 mins'
                    }, 
                    {
                        value: 60,
                        label: 'Before 1 hour'
                    }
                ]
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        { 
            dataField: "notificationIcon", 
            text: "Action",
            formatter: notificationButtonFormatterForMedicine,
            editable: false,
            headerAttrs: { 
                colSpan: 3
            },
            headerAlign: 'center'
        },
        { 
            dataField: "edit", 
            text: "Action",
            formatter: editButtonFormatterForMedicine,
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <EditableButtonForMedicine { ...editorProps } value={ value } id={row._id} row={row} setSearchIdThroughFunction={setSearchIdThroughFunction.bind(this)} setEditButtonShowThroughFunction={setEditButtonShowThroughFunction.bind(this)} pageRender={pageRender.bind(this)} />
            ),
            headerClasses: 'd-none'
        },
        { 
            dataField: "delete", 
            text: "Action",
            formatter: deleteButtonFormatterForMedicine,
            editable: false,
            headerClasses: 'd-none'
        }
    ];

    const dietTableColumns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        },
        {
            dataField: 'itemName',
            text: 'Item',
            editable: false
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
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: startDateFormatter,
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
                if(!moment(newValue).isSameOrBefore(row.endDate)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                console.log(row.endDate)
                console.log(row.startDate)
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                console.log(row.continuity)
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: endDateFormatter,
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
                if(!moment(row.startDate).isSameOrBefore(newValue)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'continuity',
            text: 'Continuity',
            // editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editable: false,
            formatter: continuityFormatter,
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
            dataField: 'time',
            text: 'Time',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: timeFormatter,
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
            dataField: 'notificationBefore',
            text: 'Notification',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: notificationTimeBeforeFormatter,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 15,
                        label: 'Before 15 mins'
                    }, 
                    {
                        value: 30,
                        label: 'Before 30 mins'
                    }, 
                    {
                        value: 60,
                        label: 'Before 1 hour'
                    }
                ]
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        { 
            dataField: "notificationIcon", 
            text: "Action",
            formatter: notificationButtonFormatterForDiet,
            editable: false,
            headerAttrs: { 
                colSpan: 3
            },
            headerAlign: 'center'
        },
        { 
            dataField: "edit", 
            text: "Action",
            formatter: editButtonFormatterForDiet,
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <EditableButtonForDiet { ...editorProps } value={ value } id={row._id} row={row} setSearchIdThroughFunction={setSearchIdThroughFunction.bind(this)} setEditButtonShowThroughFunction={setEditButtonShowThroughFunction.bind(this)} pageRender={pageRender.bind(this)} />
            ),
            headerClasses: 'd-none'
        },
        { 
            dataField: "delete", 
            text: "Action",
            formatter: deleteButtonFormatterForDiet,
            editable: false,
            headerClasses: 'd-none'
        }
    ];

    const exerciseTableColumns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        },
        {
            dataField: 'itemName',
            text: 'Item',
            editable: false
        }, 
        {
            dataField: 'duration',
            text: 'Duration',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            /* validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                  return {
                    valid: false,
                    message: 'Unit should be numeric'
                  };
                }
                return true;
            }, */
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        }, 
        {
            dataField: 'startDate',
            text: 'Start Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: startDateFormatter,
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
                if(!moment(newValue).isSameOrBefore(row.endDate)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                console.log(row.endDate)
                console.log(row.startDate)
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                console.log(row.continuity)
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'endDate',
            text: 'End Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: endDateFormatter,
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
                if(!moment(row.startDate).isSameOrBefore(newValue)){
                    return {
                        valid: false,
                        message: 'Start Date should not be greater than End Date.'
                    };
                }
                row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'continuity',
            text: 'Continuity',
            // editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editable: false,
            formatter: continuityFormatter,
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
            dataField: 'time',
            text: 'Time',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: timeFormatter,
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
            dataField: 'notificationBefore',
            text: 'Notification',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: notificationTimeBeforeFormatter,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 15,
                        label: 'Before 15 mins'
                    }, 
                    {
                        value: 30,
                        label: 'Before 30 mins'
                    }, 
                    {
                        value: 60,
                        label: 'Before 1 hour'
                    }
                ]
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        { 
            dataField: "notificationIcon", 
            text: "Action",
            formatter: notificationButtonFormatterForExercise,
            editable: false,
            headerAttrs: { 
                colSpan: 3
            },
            headerAlign: 'center'
        },
        { 
            dataField: "edit", 
            text: "Action",
            formatter: editButtonFormatterForExercise,
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <EditableButtonForExercise { ...editorProps } value={ value } id={row._id} row={row} setSearchIdThroughFunction={setSearchIdThroughFunction.bind(this)} setEditButtonShowThroughFunction={setEditButtonShowThroughFunction.bind(this)} pageRender={pageRender.bind(this)} />
            ),
            headerClasses: 'd-none'
        },
        { 
            dataField: "delete", 
            text: "Action",
            formatter: deleteButtonFormatterForExercise,
            editable: false,
            headerClasses: 'd-none'
        }
    ];

    /*const doctorsScheduleTableColumns = [
        {
            dataField: '_id',
            text: 'Id',
            hidden: true,
            headerStyle: {
                width: '0%'
            }
        },
        {
            dataField: 'doctorsName',
            text: "Doctor's Name",
            editable: false
        }, 
        {
            dataField: 'place',
            text: 'Place',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            /* validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                  return {
                    valid: false,
                    message: 'Unit should be numeric'
                  };
                }
                return true;
            }, */
            /*editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        }, 
        {
            dataField: 'date',
            text: 'Date',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: dateFormatter,
            editor: {
                type: Type.DATE
            },
            validator: (newValue, row, column) => {
                if (!newValue){
                  return {
                    valid: false,
                    message: 'Date must enter'
                  };
                }
                return true;
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        {
            dataField: 'time',
            text: 'Time',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: timeFormatter,
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
            dataField: 'notificationBefore',
            text: 'Notification',
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            formatter: notificationTimeBeforeFormatter,
            editor: {
                type: Type.SELECT,
                options: [
                    {
                        value: 15,
                        label: 'Before 15 mins'
                    }, 
                    {
                        value: 30,
                        label: 'Before 30 mins'
                    }, 
                    {
                        value: 60,
                        label: 'Before 1 hour'
                    }
                ]
            },
            editorClasses: (cell, row, rowIndex, colIndex) => (row._id === searchId ? 'rounded-pill' : '')
        },
        { 
            dataField: "notificationIcon", 
            text: "Action",
            formatter: notificationButtonFormatterForDoctorsSchedule,
            editable: false,
            headerAttrs: { 
                colSpan: 3
            },
            headerAlign: 'center'
        },
        { 
            dataField: "edit", 
            text: "Action",
            formatter: editButtonFormatterForDoctorsSchedule,
            editable: (content, row, rowIndex, columnIndex) => row._id === searchId,
            editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                <EditableButtonForDoctorsSchedule { ...editorProps } value={ value } id={row._id} row={row} setSearchIdThroughFunction={setSearchIdThroughFunction.bind(this)} setEditButtonShowThroughFunction={setEditButtonShowThroughFunction.bind(this)} pageRender={pageRender.bind(this)} />
            ),
            headerClasses: 'd-none'
        },
        { 
            dataField: "delete", 
            text: "Action",
            formatter: deleteButtonFormatterForDoctorsSchedule,
            editable: false,
            headerClasses: 'd-none'
        }
    ];*/
    
    return <React.Fragment>
        <div className="container-fluid" style={{backgroundColor: '#D0F2F9'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <h1 className="text-center mb-4">Your Activity</h1>
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        {/* <BootstrapTable
                            keyField='_id'
                            data={doctorsScheudleData}
                            columns={doctorsScheduleTableColumns}
                            wrapperClasses="table-responsive"
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                blurToSave: true, 
                                autoSelectText: true,
                                onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                    console.log('start to edit!!!')
                                    console.log(row)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('Before Saving Cell!!')
                                        console.log(oldValue)
                                    }
                                }) 
                            }
                        /> */}
                        <h1 className="text-center mb-4">Activity : Medicine</h1>
                        <BootstrapTable
                            keyField='_id'
                            data={medicineData}
                            columns={medicineTableColumns}
                            wrapperClasses="table-responsive"
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                blurToSave: true, 
                                autoSelectText: true,
                                onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                    console.log('start to edit!!!')
                                    console.log(row)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('Before Saving Cell!!')
                                        console.log(oldValue)
                                        console.log(newValue)
                                },
                                afterSaveCell: (oldValue, newValue, row, column) => { 
                                    console.log('After Saving Cell!!')
                                    console.log(row)
                                    row.continuity = moment(row.endDate, "YYYY-MM-DD").diff(moment(row.startDate, "YYYY-MM-DD"), "days") + 1
                                }
                            })
                            }
                        />
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Diet</h1>
                        <BootstrapTable
                            keyField='_id'
                            data={dietData}
                            columns={dietTableColumns}
                            wrapperClasses="table-responsive"
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                blurToSave: true, 
                                autoSelectText: true,
                                onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                    console.log('start to edit!!!')
                                    console.log(row)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('Before Saving Cell!!')
                                        console.log(oldValue)
                                    }
                                }) 
                            }
                        />
                    </div>
                    <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Exercise</h1>
                        <BootstrapTable
                            keyField='_id'
                            data={exerciseData}
                            columns={exerciseTableColumns}
                            wrapperClasses="table-responsive"
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                blurToSave: true, 
                                autoSelectText: true,
                                onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                    console.log('start to edit!!!')
                                    console.log(row)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('Before Saving Cell!!')
                                        console.log(oldValue)
                                    }
                                }) 
                            }
                        />
                    </div>
                    {/* <div className="col-12 mt-4 mb-4">
                        <h1 className="text-center mb-4">Activity : Doctor's Schedule</h1>
                        <BootstrapTable
                            keyField='_id'
                            data={doctorsScheudleData}
                            columns={doctorsScheduleTableColumns}
                            wrapperClasses="table-responsive"
                            classes="table-light table-striped table-hover"
                            headerWrapperClasses="thead-dark"
                            pagination={paginationFactory()}
                            cellEdit={ cellEditFactory({ 
                                mode: 'click', 
                                blurToSave: true, 
                                autoSelectText: true,
                                onStartEdit: (row, column, rowIndex, columnIndex) => { 
                                    console.log('start to edit!!!')
                                    console.log(row)
                                },
                                beforeSaveCell: (oldValue, newValue, row, column) => { 
                                        console.log('Before Saving Cell!!')
                                        console.log(oldValue)
                                    }
                                }) 
                            }
                        />
                    </div> */}
                </div>
            </div>
        </div>
    </React.Fragment>;
};

export default ActivityManagementTable;