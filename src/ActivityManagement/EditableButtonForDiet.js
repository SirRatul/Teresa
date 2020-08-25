import React, {useEffect, useState, useContext, forwardRef} from 'react';
import axios from 'axios'
import {Cookies} from 'react-cookie';
import {AuthContext} from '../shared/context/auth-context'
import moment from 'moment'

const EditableButton = forwardRef((props, ref) => {
    const [editableButtonShow, setEditableButtonShow] = useState(false)
    const auth = useContext(AuthContext)
    const cookies = new Cookies()
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        } 
    })
    useEffect(() => {
        console.log('effect in ranger 2')
        console.log(props.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editableButtonShow])
    return  <div className="btn-group" role="group" aria-label="Basic example">
        {/* <p>{props.id}</p> */}
        <button type="button" className={"table-row-icon "+(!editableButtonShow ? "d-inline" : "d-none")} onClick={function() {
            console.log('test2 quality')
            console.log(props.id)
            setEditableButtonShow(true)
            props.setSearchIdThroughFunction(props.id)
            props.setEditButtonShowThroughFunction()
        }}>
            <i className="fas fa-edit"></i>
        </button>
        <button type="button" className={"table-row-icon "+(editableButtonShow ? "d-inline" : "d-none")} onClick={async() => {
            setEditableButtonShow(false)
            console.log('test2 in quality')
            try {
                const response = await authAxios.patch('routines/diet/'+props._id,{
                    startDate: moment(props.row.startDate).format("YYYY-MM-DD"),
                    endDate: moment(props.row.endDate).format("YYYY-MM-DD"),
                    continuity: moment(props.row.endDate, "YYYY-MM-DD").diff(moment(props.row.startDate, "YYYY-MM-DD"), "days") + 1,
                    time: props.row.time,
                    unit: props.row.unit,
                    notificationBefore: props.row.notificationBefore
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
                        const response = await authAxiosChange.patch('routines/diet/'+props._id,{
                            startDate: moment(props.row.startDate).format("YYYY-MM-DD"),
                            endDate: moment(props.row.endDate).format("YYYY-MM-DD"),
                            continuity: moment(props.row.endDate, "YYYY-MM-DD").diff(moment(props.row.startDate, "YYYY-MM-DD"), "days") + 1,
                            time: props.row.time,
                            unit: props.row.unit,
                            notificationBefore: props.row.notificationBefore
                        })
                        console.log('response.data');
                        console.log(response.data);
                    } catch (error) {
                        console.log(error.response.data);
                    }
                }
            }
            props.pageRender()
        }}>
            <i className="fas fa-check"></i>
        </button>
        <button type="button" className={"table-row-icon "+(editableButtonShow ? "d-inline" : "d-none")} onClick={function() {
            setEditableButtonShow(false)
            console.log('test3 in quality')
            props.pageRender()
        }}>
            <i className="fas fa-window-close"></i>
        </button>
    </div>;
})

export default EditableButton;