import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Nurse from '../shared/img/Nurse.png';
import './ResetPassword.css'

const ResetPassword = () => {
    const history = useHistory()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(password)
        console.log(confirmPassword)
        history.push('/login')
    }
    return  <React.Fragment>
        <div className="container-fluid w-100 h-100 full_div">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>
            <br/>
            <br/>
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
                                            <input className="form-control rounded-pill form-input-background" type={(showPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
                                            <input className="form-control rounded-pill form-input-background" type={(showConfirmPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
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
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>RESET</button>
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