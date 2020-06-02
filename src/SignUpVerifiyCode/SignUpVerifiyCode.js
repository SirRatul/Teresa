import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Logo from '../shared/img/teresa.png'
import Doctor from '../shared/img/Dr.jpg';
import './SignUpVerifiyCode.css'

const SignUpVerifiyCode = () => {
    const [verificationCode, setVerificationCode] = useState('')
    const history = useHistory()
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(verificationCode)
        history.push('/login')
    }
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div">
            <br/>
            <br/>
            <div className="container shadow">
                <div className="row bg-white">
                    <div className="col-12 col-lg-6">
                        <img className="mx-auto d-block teresa-logo" src={Logo} alt="Teresa Logo"/>
                    </div>
                    <div className="col-12 col-lg-6">
                        <p className="active text-center font-weight-bold login-text">Sign Up Verification</p>
                    </div>
                </div>
                <div className="row bg-white">
                    <div className="col-lg-6 mt-5 mb-5 text-center d-none d-lg-block">
                        <img className="nurse-image" src={Doctor} alt=""/>
                    </div>
                    <div className="col-lg-6 mb-5">
                        <div className="col-12 offset-0 col-sm-10 offset-sm-1 mt-0 mt-lg-5">
                            <h5 className="text-center" style={{color: '#2C2C6A'}}>You will receive a verification at the phone number you entered to create account. Please enter the code to verify your account</h5>
                        </div>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2 col-sm-6 offset-sm-3 mt-2">
                                        <label>Enter the verification code</label>
                                        <input type="text" className="form-control rounded-pill form-input-background" placeholder="Verification code" name='verificationCode' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mt-3 mb-5 mb-lg-0">
                                    <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>Verify</button>
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

export default SignUpVerifiyCode;