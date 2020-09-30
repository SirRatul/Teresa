import React, {useState} from 'react';
import {Helmet} from "react-helmet";
// import Logo from '../shared/img/logo.png'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import { slide as Menu1 } from 'react-burger-menu'
import Menu from "../shared/component/Menu";
import ProfileInformation from "./ProfileInformation";
import UploadedPrescriptions from "./UploadedPrescriptions";
import SecuritySetting from "./SecuritySetting";
import Footer from '../shared/component/Footer'
import './Profile.css'

const Profile = () => {
    const [profileInformation, setProfileInformation] = useState(true)
    const [uploadedPrescription, setUploadedPrescription] = useState(false)
    const [securitySetting, setSecuritySetting] = useState(false)
    const profileInformationView = () => {
        console.log('profileInformationView')
        setProfileInformation(true)
        setUploadedPrescription(false)
        setSecuritySetting(false)
    }
    const uploadedPrescriptionView = () => {
        setProfileInformation(false)
        setUploadedPrescription(true)
        setSecuritySetting(false)
    }
    const securitySettingView = () => {
        setProfileInformation(false)
        setUploadedPrescription(false)
        setSecuritySetting(true)
    }
    /* const openNav = () => {
        console.log('click')
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    const closeNav = () => {
        console.log('click')
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    } */
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Profile</title>
        </Helmet>
        <Menu />
        
        <div className="container-fluid w-100 h-100 pt-5 header-background">
            <div className="container">
                <div className="row">
                    <p className="text-left text-light ml-3 ml-lg-0 display-4 upload-prescription-header-text">Profile</p>
                </div>
                <div className="row">
                    <Breadcrumb className='ml-0 ml-lg-n3'>
                        <Breadcrumb.Item className='text-light' href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div>
        {/* <Menu1 htmlClassName={ "d-block d-md-none" } customBurgerIcon={ <p className='d-block d-md-none'>Hamburger</p> }>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
        </Menu1> */}
        {/* <div id="mySidebar" class="sidebar ml-n3">
            <a href="javascript:void(0)" class="closebtn" onClick={()=>{closeNav()}}>×</a>
            <div id='profile' className={'mx-n3 py-4 '+(profileInformation ? 'selectedProfileInfo' : '')} onClick={()=>{profileInformationView()}}>
                <p className="h5 ml-4">Profile Information</p>
            </div>
            <div id='profile' className={'mx-n3 py-4 '+(uploadedPrescription ? 'selectedProfileInfo' : '')} onClick={()=>{uploadedPrescriptionView()}}>
                <p className="h5 ml-4">Uploaded Prescriptions</p>
            </div>
            <div id='profile' className={'mx-n3 py-4 '+(securitySetting ? 'selectedProfileInfo' : '')} onClick={()=>{securitySettingView()}}>
                <p className="h5 ml-4">Security Settings</p>
            </div>
        </div> */}
        {/* <div id="main" className='d-none'>
            <button class="openbtn" onClick={()=>{openNav()}}>☰ Open Sidebar</button>  
        </div> */}
        <div className="container-fluid ml-n2">
            <div className="row">
                <div className="col-md-3" style={{backgroundColor: '#d1e3e2'}}>
                    <div id='profile' className={'mx-n3 py-4 '+(profileInformation ? 'selectedProfileInfo' : '')} onClick={()=>{profileInformationView()}}>
                        <p className="h5 ml-4">Profile Information</p>
                    </div>
                    <div id='profile' className={'mx-n3 py-4 '+(uploadedPrescription ? 'selectedProfileInfo' : '')} onClick={()=>{uploadedPrescriptionView()}}>
                        <p className="h5 ml-4">Uploaded Prescriptions</p>
                    </div>
                    <div id='profile' className={'mx-n3 py-4 '+(securitySetting ? 'selectedProfileInfo' : '')} onClick={()=>{securitySettingView()}}>
                        <p className="h5 ml-4">Security Settings</p>
                    </div>
                </div>
                <div className="col-md-9">
                
                    {
                        profileInformation ?
                        <ProfileInformation />
                        :
                        uploadedPrescription ?
                        <UploadedPrescriptions />
                        :
                        securitySetting ?
                        <SecuritySetting />
                        :
                        null
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </React.Fragment>;
}

export default Profile;