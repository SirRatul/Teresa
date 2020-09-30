import React, {useState, useContext} from 'react';
import {AuthContext} from '../shared/context/auth-context'
import axios from 'axios'
import Modal from "../shared/component/Modal";
import LoadingSpinner from '../shared/component/LoadingSpinner'

const SecuritySetting = () => {
    const auth = useContext(AuthContext)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(null)
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        }
    })
    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(currentPassword)
        console.log(newPassword)
        console.log(confirmNewPassword)
        if(newPassword === confirmNewPassword){
            try {
                const response = await authAxios.post(process.env.REACT_APP_BACKEND_URL+'users/change-password', {
                    oldPassword: currentPassword, 
                    newPassword
                });
                console.log(response.data);
                setIsLoading(false)
                setDisable(false)
                setErrorMessage(response.data.message)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmNewPassword('')
            } catch (error) {
                setIsLoading(false)
                setDisable(false) 
                setErrorMessage(error.response.data.message)
            }
        } else {
            setErrorMessage('Passwords do not match')
        }
    }
    const modalHandler = () => {
        setErrorMessage(null);
    };
    return  <React.Fragment>
        <div className="container mb-5">
            <div className="row">
                {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
                <div className="col-12 justify-content-center position-relative">
                {isLoading && <LoadingSpinner/>}
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-10 offset-1 col-sm-5 offset-sm-4 col-md-4 offset-md-4 mt-3 mb-3 mb-lg-0">
                                <label className="control-label">Current Password</label>
                                <div className="input-group rounded-pill form-input-background">
                                    <input className="form-control rounded-pill form-input-background" type={(showCurrentPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Current password" name="currentPassword" value={currentPassword} onChange={(e) =>{
                                        setCurrentPassword(e.target.value)
                                    } } required disabled={(disable)? "disabled" : ""}/>
                                    <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                        <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showCurrentPassword ? '': '-slash')} onClick={function(){
                                            setShowCurrentPassword(!showCurrentPassword)
                                        }}></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-10 offset-1 col-sm-5 offset-sm-4 col-md-4 offset-md-4 mt-3 mb-3 mb-lg-0">
                                <label className="control-label">New Password</label>
                                <div className="input-group rounded-pill form-input-background">
                                    <input className="form-control rounded-pill form-input-background" type={(showNewPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="New password" name="newPassword" value={newPassword} onChange={(e) =>{
                                        if(e.target.value.length === 0){
                                            setNewPasswordError(null)
                                        } else if(e.target.value.length < 6){
                                            setNewPasswordError("Password length must be 6 characters.")
                                        } else if(e.target.value.length > 6 && confirmNewPassword && e.target.value !== confirmNewPassword){
                                            setConfirmNewPasswordError("Must be same as password.")
                                        }
                                        else {
                                            setConfirmNewPasswordError(null)
                                            setNewPasswordError(null)
                                        }
                                        setNewPassword(e.target.value)
                                    } } required disabled={(disable)? "disabled" : ""}/>
                                    <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                        <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showNewPassword ? '': '-slash')} onClick={function(){
                                            setShowNewPassword(!showNewPassword)
                                        }}></i></span>
                                    </div>
                                </div>
                                {
                                    newPasswordError && <span className="text-danger">{newPasswordError}</span>
                                }
                            </div>
                            <div className="col-10 offset-1 col-sm-5 offset-sm-4 col-md-4 offset-md-4 mt-3">
                                <label className="control-label">Confirm New Password</label>
                                <div className="input-group rounded-pill form-input-background">
                                    <input className="form-control rounded-pill form-input-background" type={(showConfirmNewPassword ? 'text': 'password')} style={{border: '0', boxShadow: 'none'}} placeholder="Confirm New password" name="confirmNewPassword" value={confirmNewPassword} onChange={(e) => {
                                        if(e.target.value.length === 0){
                                            setConfirmNewPasswordError(null)
                                            setConfirmNewPassword(e.target.value)
                                        } else if(e.target.value !== newPassword){
                                            setConfirmNewPasswordError("Must be same as password.")
                                            setConfirmNewPassword(e.target.value)
                                        } else{
                                            setConfirmNewPasswordError(null)
                                            setConfirmNewPassword(e.target.value)
                                        }
                                    }} required disabled={(disable)? "disabled" : ""}/>
                                    <div className="input-group-addon" style={{border: '0', boxShadow: 'none'}}>
                                        <span className="input-group-btn"><i className={"mt-2 mr-3 fas fa-eye"+(showConfirmNewPassword ? '': '-slash')} onClick={function(){
                                            setShowConfirmNewPassword(!showConfirmNewPassword)
                                        }}></i></span>
                                    </div>
                                </div>
                                {
                                    confirmNewPasswordError && <span className="text-danger">{confirmNewPasswordError}</span>
                                }
                            </div>
                            <div className="col-6 offset-3 col-sm-3 offset-sm-6 mt-4">
                                <button type="submit" className="btn btn-block text-white text-center" style={{borderRadius: '1em', backgroundColor: '#0C0C52'}} disabled={(disable)? "disabled" : ""}>Change</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </React.Fragment>;
}

export default SecuritySetting;