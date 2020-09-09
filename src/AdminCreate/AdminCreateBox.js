import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../shared/img/teresa.png'
import Doctor from '../shared/img/Dr.jpg';
import Modal from "../shared/component/Modal";
import axios from 'axios'
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import './AdminCreateBox.css'

const AdminCreateBox = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const authAdminAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${props.adminToken}`
        } 
    })
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(props.adminToken)
        console.log(userName)
        console.log(password)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await authAdminAxios.post(process.env.REACT_APP_BACKEND_URL+'admin/create-user', {
                userName,
                password
            });
            console.log(response.data);
            setIsLoading(false)
            setDisable(false)
            history.push('/admin-invoice-list')
        } catch (error) {
            setIsLoading(false)
            setDisable(false)
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message)
        }
    }

    const modalHandler = () => {
        auth.authMessage = null
        setErrorMessage(null)
    };

    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div position-relative">
            <br/>
            <br/>
            {auth.authMessage &&<Modal message={auth.authMessage} onClear={modalHandler.bind(this)}/>}
            {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
            {isLoading && <LoadingSpinner/>}
            <div className="container shadow">
                <div className="row bg-white">
                    <div className="col-12 col-lg-6">
                        <img className="mx-auto d-block teresa-logo" src={Logo} alt="Teresa Logo"/>
                    </div>
                    <div className="col-12 col-lg-6">
                        <p className="active text-center font-weight-bold login-text">Admin Create</p>
                    </div>
                </div>
                <div className="row bg-white">
                    <div className="col-lg-6 text-center d-none d-lg-block">
                        <img className="doctor-image" src={Doctor} alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div className="login" id="loginBox">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <div className="col-10 offset-1 col-sm-6 offset-sm-3 mt-5 mt-lg-0">
                                        <label>Enter User Name</label>
                                        <input type="text" className="form-control rounded-pill   form-input-background" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="User Name" required disabled={(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-10 offset-1 col-sm-6 offset-sm-3">
                                        <label>Enter your password</label>
                                        <div className="input-group rounded-pill form-input-background">
                                            <input className="form-control rounded-pill form-input-background" type={(showpassword ? 'text': 'password')} name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{border: '0', boxShadow: 'none'}} placeholder="Password" required disabled={(disable)? "disabled" : ""}/>
                                            <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showpassword ? '': '-slash')} onClick={function(){
                                                    setShowPassword(!showpassword)
                                                }}></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-4">
                                    <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    </React.Fragment>;
}

export default AdminCreateBox;