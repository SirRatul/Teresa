import React, {useState, useContext} from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Nurse from '../shared/img/Nurse.png';
import {AuthContext} from '../shared/context/auth-context'
import LoadingSpinner from '../shared/component/LoadingSpinner'
import Modal from "../shared/component/Modal";
import './ForgetPasswordVerifiyCode.css'

const ForgetPasswordVerifiyCode = () => {
    const [verificationCode, setVerificationCode] = useState('')
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(verificationCode)
        setIsLoading(true)
        setDisable(true)
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/verify-pass-recovery-code', {
                phone: auth.phone,
                otp: verificationCode
            })
            console.log(response.data);
            auth.otp = verificationCode
            history.push('/resetPassword')
        } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message)
        }
        setIsLoading(false)
        setDisable(false)
    }
    const modalHandler = () => {
        setErrorMessage(null);
    };
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div position-relative">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password Verification Code</title>
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
                    <div className="col-lg-6 mb-5">
                        <p className="h3 font-weight-bold text-center mt-5 mb-2" style={{color: '#0F0F55'}}>Verification</p>
                        <h5 className="text-center mt-5" style={{color: '#2C2C6A'}}>You will receive a verification code on your phone.</h5>
                        <div className="col-12 offset-0 col-sm-10 offset-sm-1 mt-5">
                            <h5 className="text-center" style={{color: '#2C2C6A'}}>Enter the verification code sent to your phone number and submit to reset your password</h5>
                        </div>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2 col-sm-6 offset-sm-3 mt-2">
                                        <label>Enter the verification code</label>
                                        <input type="text" className="form-control rounded-pill form-input-background" placeholder="Verification code" name='verificationCode' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mt-3 mb-5 mb-lg-0">
                                    <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Submit</button>
                                    </div>
                                </div>
                            </div>
                            <p className="font-weight-bold text-center mt-5 mb-2" style={{color: '#0F0F55'}}>Didn't get the code yet?</p>
                        </form>
                        <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4 mt-4" style={{paddingRight: '5px', paddingLeft: '5px'}}>
                            <button className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Resend Code</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    </React.Fragment>;
}

export default ForgetPasswordVerifiyCode;