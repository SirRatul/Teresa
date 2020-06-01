import React, {useState} from 'react';
import Logo from '../shared/img/teresa.png'
import Doctor from '../shared/img/Dr.jpg';
import './RegistrationBox.css'

const RegistrationBox = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowPassword] = useState(false)
    const [dateOfBirthType, setdateOfBirthType] = useState(false)

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
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
                        <p className="active text-center font-weight-bold login-text">Create Account</p>
                    </div>
                </div>
                <div className="row bg-white">
                    <div className="col-lg-6 text-center d-none d-lg-block">
                        <img className="doctor-image" src={Doctor} alt=""/>
                    </div>
                    <div className="col-lg-6">
                        <div className="register" id="registerBox">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <p className='h4 font-weight-bold' style={{color: '#060735'}}>General Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <label>First Name</label>
                                            <input type="text" class="form-control rounded-pill   form-input-background" placeholder="First Name"/>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Last Name</label>
                                            <input type="text" class="form-control rounded-pill   form-input-background" placeholder="Last Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Email</label>
                                            <input type="email" class="form-control rounded-pill   form-input-background" placeholder="Email"/>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Date Of Birth</label>
                                            <input placeholder="Date Of Birth" class="form-control rounded-pill form-input-background textbox-n" type={dateOfBirthType ? 'date' : 'text'} onFocus={function(){
                                                setdateOfBirthType(true)
                                            }} onBlur={function(){
                                                setdateOfBirthType(false)
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Gender</label>
                                            <select class="form-control rounded-pill  form-input-background">
                                                <option className='form-input-background rounded-pill' selected>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Blood Group</label>
                                            <select class="custom-select form-control rounded-pill  form-input-background">
                                                <option selected>A+</option>
                                                <option>A-</option>
                                                <option>B+</option>
                                                <option>B-</option>
                                                <option>O+</option>
                                                <option>O-</option>
                                                <option>AB+</option>
                                                <option>AB-</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <p className='h4 font-weight-bold' style={{color: '#060735'}}>Account Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-1 d-block d-sm-none">
                                        </div>
                                        <div className="col-4 offset-0 col-sm-2 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Phone</label>
                                            <select class="custom-select form-control rounded-pill  form-input-background" disabled>
                                                <option selected>+880</option>
                                            </select>
                                        </div>
                                        <div className="col-6 offset-0 col-sm-4 offset-sm-0 mt-2 mt-lg-0">
                                            <input type="tel" class="form-control rounded-pill   form-input-background" style={{marginTop: '2rem'}} placeholder="Phone number"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Password</label>
                                            <div class="input-group rounded-pill form-input-background">
                                                <input class="form-control rounded-pill form-input-background" type={(showpassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password"/>
                                                <div class="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                    <span class="input-group-btn"><i class={"mt-2 mr-3 fas fa-eye"+(showpassword ? '': '-slash')} onClick={function(){
                                                        console.log('click')
                                                        setShowPassword(!showpassword)
                                                    }}></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Confirm Password</label>
                                            <div class="input-group rounded-pill form-input-background">
                                                <input class="form-control rounded-pill form-input-background" type={(showpassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Confirm Password"/>
                                                <div class="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                    <span class="input-group-btn"><i class={"mt-2 mr-3 fas fa-eye"+(showpassword ? '': '-slash')} onClick={function(){
                                                        console.log('click')
                                                        setShowPassword(!showpassword)
                                                    }}></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div class="form-row">
                                        <div className="col-10 offset-1 col-sm-12 offset-sm-0 mt-2 mt-lg-0">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="defaultCheck1"/>
                                                <label for="defaultCheck1" class="custom-control-label">I've read and agree to the terms and conditions</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row mt-3 mb-5 mb-lg-0">
                                    <div className="col-8 offset-2 col-sm-4 offset-sm-4 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                                        <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}}>CREATE ACCOUNT</button>
                                    </div>
                                </div>
                                <div className="form-group mt-n4 mt-sm-4 mb-5">
                                    <div className="col-10 offset-1 col-sm-12 offset-sm-0">
                                        <p className="text-center">
                                            <a href="/login" style={{color: '#2D2E6A'}}>I already have an account</a>
                                        </p>
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

export default RegistrationBox;