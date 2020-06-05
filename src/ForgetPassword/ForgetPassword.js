import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Nurse from '../shared/img/Nurse.png';
import './ForgetPassword.css'

const ForgetPassword = () => {
    const [phone, setPhone] = useState('')
    const history = useHistory()
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(phone)
        history.push('/forgot-password-verification')
    }
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget Password</title>
            </Helmet>
            <br/>
            <br/>
            <div className="container shadow">
                <div className="row bg-white">
                    <div className="col-lg-6 mt-5 mb-5 text-center d-none d-lg-block">
                        <img className="nurse-image" src={Nurse} alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <p className="h3 font-weight-bold text-center mt-5 mb-2" style={{color: '#0F0F55'}}>Password Recovery</p>
                        <h5 className="text-center mt-5" style={{color: '#2C2C6A'}}>Enter your phone number you used to</h5>
                        <h5 className="text-center mt-2" style={{color: '#2C2C6A'}}>create your Teresa account</h5>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <div className="form-row">
                                    <div className="col-8 offset-2 col-sm-6 offset-sm-3 mt-2">
                                        <label>Enter your phone number</label>
                                        <input type="tel" className="form-control rounded-pill form-input-background" placeholder="Phone number" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-row mt-3 mb-5 mb-lg-0">
                                    <div className="col-4 offset-4 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>NEXT</button>
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

export default ForgetPassword;