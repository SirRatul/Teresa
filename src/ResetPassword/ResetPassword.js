import React, {useState, useContext} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Nurse from '../shared/img/Nurse.png';
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import Modal from "../shared/component/Modal";
import './ResetPassword.css'

const ResetPassword = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(password)
        console.log(confirmPassword)
        if(password !== confirmPassword){
            setErrorMessage('Passwords do not match')
        } else {
            setIsLoading(true)
            setDisable(true)
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/new-pass', {
                    phone: auth.phone,
                    otp: auth.otp,
                    password
                })
                auth.phone = null
                auth.otp = null
                auth.authMessage = response.data.message
                console.log(response.data);
                history.push('/login')
            } catch (error) {
                console.log(error.response.data);
                setErrorMessage(error.response.data.message)
            }
            setIsLoading(false)
            setDisable(false)
        }
    }
    const modalHandler = () => {
        setErrorMessage(null);
    };
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div position-relative">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>
            <br/>
            <br/>
            {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
            {isLoading && <LoadingSpinner/>}
            <div className="container shadow">
                <div className="row bg-white">
                    <div className="col-lg-6 mt-5 mb-5 text-center d-none d-lg-block">
                        <img className="nurse-image" src={Nurse} alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <p className="font-weight-bold text-center mt-5 mb-2 reset-password-header" style={{color: '#0F0F55'}}>Reset Password</p>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-10 offset-1 col-sm-6 offset-sm-3 mt-2">
                                        <label>Enter your new password</label>
                                        <div className="input-group rounded-pill form-input-background">
                                            <input className="form-control rounded-pill form-input-background" type={(showPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                            <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showPassword ? '': '-slash')} onClick={function(){
                                                    setShowPassword(!showPassword)
                                                }}></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-10 offset-1 col-sm-6 offset-sm-3 mt-2">
                                        <label>Confirm your new password</label>
                                        <div className="input-group rounded-pill form-input-background">
                                            <input className="form-control rounded-pill form-input-background" type={(showConfirmPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                            <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showConfirmPassword ? '': '-slash')} onClick={function(){
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }}></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mt-4 mb-5 mb-lg-0">
                                    <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>RESET</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    </React.Fragment>;
}

export default ResetPassword;