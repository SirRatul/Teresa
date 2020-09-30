import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import ProfilePic from '../shared/img/profile-pic.png';
import {AuthContext} from '../shared/context/auth-context'
import axios from 'axios'
import Modal from "../shared/component/Modal";
import LoadingSpinner from '../shared/component/LoadingSpinner'

const ProfileInformation = () => {
    const auth = useContext(AuthContext)
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
            value: '', label: 'Select your Blood Group'
        }
    })
    const [phone, setPhone] = useState('')
    const [dateOfBirthType, setdateOfBirthType] = useState(false)
    const [height, setHeight] = useState({
        height:{
            value: '', label: 'Select your Height'
        }
    })
    const [weight, setWeight] = useState('')
    const [address, setAddress] = useState('')
    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ];
    const bloodOptions = [
        { value: '', label: 'Select your Blood Group' },
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' }
    ];
    const heightOptions = [
        { value: '', label: 'Select your Height' },
        { value: "4'1''", label: "4'1''" },
        { value: "4'2''", label: "4'2''" },
        { value: "4'3''", label: "4'3''" },
        { value: "4'4''", label: "4'4''" },
        { value: "4'5''", label: "4'5''" },
        { value: "4'6''", label: "4'6''" },
        { value: "4'7''", label: "4'7''" },
        { value: "4'8''", label: "4'8''" },
        { value: "4'9''", label: "4'9''" },
        { value: "4'10''", label: "4'10''" },
        { value: "4'11''", label: "4'11''" },
        { value: "5'", label: "5'" },
        { value: "5'1''", label: "5'1''" },
        { value: "5'2''", label: "5'2''" },
        { value: "5'3''", label: "5'3''" },
        { value: "5'4''", label: "5'4''" },
        { value: "5'5''", label: "5'5''" },
        { value: "5'6''", label: "5'6''" },
        { value: "5'7''", label: "5'7''" },
        { value: "5'8''", label: "5'8''" },
        { value: "5'9''", label: "5'9''" },
        { value: "5'10''", label: "5'10''" },
        { value: "5'11''", label: "5'11''" },
        { value: "6'", label: "6'" },
        { value: "6'1''", label: "6'1''" },
        { value: "6'2''", label: "6'2''" },
        { value: "6'3''", label: "6'3''" },
        { value: "6'4''", label: "6'4''" },
        { value: "6'5''", label: "6'5''" },
        { value: "6'6''", label: "6'6''" },
        { value: "6'7''", label: "5'7''" },
        { value: "6'8''", label: "6'8''" },
        { value: "6'9''", label: "6'9''" },
        { value: "6'10''", label: "6'10''" },
        { value: "6'11''", label: "6'11''" },
        { value: "7'", label: "7'" },
    ];
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
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

    const selectHeight = (value) => {
        setHeight({
            ...height,
            height: value
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

    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        }
    })

    useEffect(() => {
        const profileInfo = async () => {
            try {
                const response = await authAxios.get(process.env.REACT_APP_BACKEND_URL+'users/me', {
                });
                console.log(response.data);
                setFirstName(response.data.message.firstName)
                setLastName(response.data.message.lastName)
                setEmail(response.data.message.email)
                setBirthDate(response.data.message.dob)
                setGender({
                    ...gender,
                    gender: {
                        value: response.data.message.gender, 
                        label: response.data.message.gender
                    }
                  }
                )
                setBloodGroup({
                    ...bloodGroup,
                    bloodGroup: {
                        value: response.data.message.bloodGroup, 
                        label: response.data.message.bloodGroup
                    }
                  }
                )
                setPhone(response.data.message.phone.substring(3))
                if(response.data.message.address){
                    setAddress(response.data.message.address)
                }
                if(response.data.message.height){
                    setHeight({
                        ...height,
                        height: {
                            value: response.data.message.height, 
                            label: response.data.message.height
                        }
                      }
                    )
                }
                if(response.data.message.weight){
                    setWeight(response.data.message.weight)
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        profileInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(firstName)
        console.log(lastName)
        console.log(birthDate)
        try {
            const response = await authAxios.patch(process.env.REACT_APP_BACKEND_URL+'users/me', {
                firstName, 
                lastName,
                dob: birthDate,
                address,
                bloodGroup: bloodGroup.bloodGroup.value ? bloodGroup.bloodGroup.value : undefined,
                height: height.height.value ? height.height.value : undefined,
                weight
            });
            console.log(response.data);
            setIsLoading(false)
            setDisable(false)
            setErrorMessage('Profile Information Updated Successfully')
        } catch (error) {
            setIsLoading(false)
            setDisable(false) 
            setErrorMessage(error.response.data.message)
        }
    }
    const modalHandler = () => {
        setErrorMessage(null);
    };
    return  <React.Fragment>
        <div className="container">
            <div className="row">
                {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
                <div className="col-12 my-3">
                    <img className="d-block mx-auto rounded-circle" style={{width: '230px', height: '230px'}} src={ProfilePic} alt="Profile"/>
                </div>
                <div className="col-12 justify-content-center position-relative">
                    <form onSubmit={submitHandler}>
                        {isLoading && <LoadingSpinner/>}
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                    <p className='h4 font-weight-bold' style={{color: '#060735'}}>General Info</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mb-3 mb-lg-0">
                                    <label className="control-label">First Name</label>
                                    <input type="text" className="form-control rounded-pill form-input-background" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                </div>
                                <div className="col-10 offset-1 col-sm-2 offset-sm-0 mb-3 mb-lg-0 d-none d-sm-block">
                                </div>
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control rounded-pill form-input-background" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={(disable)? "disabled" : ""}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 mb-3 mb-lg-0">
                                    <label>Email</label>
                                    <input type="email" className="form-control rounded-pill form-input-background" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={(disable)? "disabled" : ""}/>
                                </div>
                                <div className="col-10 offset-1 col-sm-2 offset-sm-0 mb-3 mb-lg-0 d-none d-sm-block"></div>
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 d-none d-lg-block">
                                    <label className="control-label">Date Of Birth</label>
                                    <input placeholder="Date Of Birth" className="form-control rounded-pill form-input-background textbox-n" type={dateOfBirthType ? 'date' : 'text'} onFocus={function(){
                                        setdateOfBirthType(true)
                                    }} onBlur={function(){
                                        setdateOfBirthType(false)
                                    }} name='dateOfBirth' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                </div>
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 d-block d-lg-none">
                                    <label className="control-label">Date Of Birth</label>
                                    <input placeholder="Date Of Birth" className="form-control rounded-pill form-input-background textbox-n" type='date' name='dateOfBirth' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 mb-3 mb-lg-0">
                                    <label className="control-label">Gender</label>
                                    <Select
                                        styles={customStyles}
                                        name={"gender"}
                                        value={gender.gender}
                                        onChange={newValue => selectGender(newValue)}
                                        options={genderOptions}
                                        disabled={(disable)? "disabled" : ""}
                                    />
                                </div>
                                <div className="col-10 offset-1 col-sm-2 offset-sm-0 mb-3 mb-lg-0 d-none d-sm-block"></div>
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0">
                                    <label>Blood Group</label>
                                    <Select
                                        styles={customStyles}
                                        name={"bloodGroup"}
                                        value={bloodGroup.bloodGroup}
                                        onChange={newValue => selectBloodGroup(newValue)}
                                        options={bloodOptions}
                                        disabled={(disable)? "disabled" : ""}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 mb-3 mb-lg-0">
                                    <label className="control-label">Height</label>
                                    <Select
                                        styles={customStyles}
                                        name={"height"}
                                        value={height.height}
                                        onChange={newValue => selectHeight(newValue)}
                                        options={heightOptions}
                                        disabled={(disable)? "disabled" : ""}
                                    />
                                </div>
                                <div className="col-10 offset-1 col-sm-2 offset-sm-0 mb-3 mb-lg-0 d-none d-sm-block"></div>
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 mb-3 mb-lg-0">
                                    <label>Weight</label>
                                    <input type="number" className="form-control rounded-pill form-input-background" placeholder="Weight" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} disabled={(disable)? "disabled" : ""}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-4 offset-sm-0 mt-2 mt-lg-0 mb-3 mb-lg-0">
                                    <label>Address</label>
                                    <textarea className="form-control form-input-background" rows="3" style={{borderRadius: '1em'}} placeholder="West Rampura, Wapda Road,&#10;Dhaka, 1230" value={address} onChange={(e) => setAddress(e.target.value)} required disabled={(disable)? "disabled" : ""}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-10 offset-1 col-sm-6 offset-sm-0">
                                    <p className='h4 font-weight-bold' style={{color: '#060735'}}>Account Information</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ml-5">
                            <div className="form-row">
                                <div className="col-1 d-block d-sm-none">
                                </div>
                                <div className="col-4 offset-0 col-sm-3 offset-sm-0 col-lg-2 offset-lg-0 mt-2 mt-lg-0">
                                    <label className="control-label">Phone</label>
                                    <select className="custom-select form-control rounded-pill form-input-background" value='+880' disabled>
                                        <option value='+880'>+880</option>
                                    </select>
                                </div>
                                <div className="col-6 offset-0 col-sm-4 offset-sm-0 mt-2 mt-lg-0">
                                    <input type="tel" className="form-control rounded-pill form-input-background" style={{marginTop: '2rem'}} placeholder="Phone number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={(disable)? "disabled" : ""}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-5 mb-5 ml-5">
                            <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-lg-4 offset-lg-4 col-xl-4 offset-xl-4">
                                <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </React.Fragment>;
}

export default ProfileInformation;