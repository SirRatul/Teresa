import React, {useState} from 'react';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import Logo from '../shared/img/teresa.png'
import Doctor from '../shared/img/Dr.jpg';
import './RegistrationBox.css'

const RegistrationBox = () => {
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState({
        gender:{
            value: 'Male', label: 'Male'
        }
    })
    const [bloodGroup, setBloodGroup] = useState({
        bloodGroup:{
            value: 'A+', label: 'A+'
        }
    })
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [dateOfBirthType, setdateOfBirthType] = useState(false)
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ];
    const bloodOptions = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' }
    ];

    const selectGender = (value) => {
        setGender({
            ...gender,
            gender: value
          }
        );
    }

    const selectBloodGroup = (value) => {
        setBloodGroup({
            ...bloodGroup,
            bloodGroup: value
          }
        );
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,

          '&:hover': {
            backgroundColor: '#0C0C52',
            color: 'white'
        }
        }),
        control: base => ({
            ...base,
            backgroundColor: '#E6E6E6',
            borderRadius: '50rem'
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(birthDate)
        console.log(gender.gender.value)
        console.log(bloodGroup.bloodGroup.value)
        console.log('+880'+phone)
        console.log(password)
        console.log(confirmPassword)
        history.push('/sign-up-verification')
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
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <p className='h4 font-weight-bold' style={{color: '#060735'}}>General Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <label>First Name</label>
                                            <input type="text" className="form-control rounded-pill form-input-background" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <label>Last Name</label>
                                            <input type="text" className="form-control rounded-pill form-input-background" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Email</label>
                                            <input type="email" className="form-control rounded-pill form-input-background" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0 d-none d-lg-block">
                                            <label>Date Of Birth</label>
                                            <input placeholder="Date Of Birth" className="form-control rounded-pill form-input-background textbox-n" type={dateOfBirthType ? 'date' : 'text'} onFocus={function(){
                                                setdateOfBirthType(true)
                                            }} onBlur={function(){
                                                setdateOfBirthType(false)
                                            }} name='dateOfBirth' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0 d-block d-lg-none">
                                            <label>Date Of Birth</label>
                                            <input placeholder="Date Of Birth" className="form-control rounded-pill form-input-background textbox-n" type='date' name='dateOfBirth' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Gender</label>
                                            <Select
                                                styles={customStyles}
                                                name={"gender"}
                                                value={gender.gender}
                                                onChange={newValue => selectGender(newValue)}
                                                options={genderOptions}
                                            />
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Blood Group</label>
                                            <Select
                                                styles={customStyles}
                                                name={"bloodGroup"}
                                                value={bloodGroup.bloodGroup}
                                                onChange={newValue => selectBloodGroup(newValue)}
                                                options={bloodOptions}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                            <p className='h4 font-weight-bold' style={{color: '#060735'}}>Account Info</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-1 d-block d-sm-none">
                                        </div>
                                        <div className="col-4 offset-0 col-sm-3 offset-sm-0 col-lg-2 offset-lg-0 mt-2 mt-lg-0">
                                            <label>Phone</label>
                                            <select className="custom-select form-control rounded-pill form-input-background" value='+880' disabled>
                                                <option value='+880'>+880</option>
                                            </select>
                                        </div>
                                        <div className="col-6 offset-0 col-sm-4 offset-sm-0 mt-2 mt-lg-0">
                                            <input type="tel" className="form-control rounded-pill form-input-background" style={{marginTop: '2rem'}} placeholder="Phone number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Password</label>
                                            <div className="input-group rounded-pill form-input-background">
                                                <input className="form-control rounded-pill form-input-background" type={(showPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                                <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                                    <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showPassword ? '': '-slash')} onClick={function(){
                                                        setShowPassword(!showPassword)
                                                    }}></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-10 offset-1 col-sm-6 offset-sm-0 mt-2 mt-lg-0">
                                            <label>Confirm Password</label>
                                            <div className="input-group rounded-pill form-input-background">
                                                <input className="form-control rounded-pill form-input-background" type={(showConfirmPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
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
                                    <div className="form-row">
                                        <div className="col-10 offset-1 col-sm-12 offset-sm-0 mt-2 mt-lg-0">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="defaultCheck1" required/>
                                                <label htmlFor="defaultCheck1" className="custom-control-label">I've read and agree to the terms and conditions</label>
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