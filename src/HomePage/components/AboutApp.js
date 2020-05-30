import React from 'react';
import DownloadButton from '../../shared/img/Download.png'
import AppPhoto from '../../shared/img/APP.png'
import './AboutApp.css'

const AboutApp = () => {
    return <div className="container-fluid mb-5" style={{backgroundColor: '#020624'}}>
        <div className="container">
            <p className="app-section-header-text text-center font-weight-bold text-white mt-5 p-3">Our App Is On The Way</p>
            <div className="row">
                <div className="col-6 mt-lg-5">
                    <p className="heading-text text-left font-weight-bold text-white ml-5">Get All Our Services in Teresa App</p>
                    <p className="text-white ml-5 main-text-app-section">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ised in the 1960s with the release of Letraset sheets containing Lorem</p>
                    <a href="/#" role="button" aria-pressed="true">
                        <img className="d-block mx-auto app-download-button" src={DownloadButton} alt=""/>
                    </a>
                </div>
                <div className="col-6 d-block">
                        <img src={AppPhoto} alt="Phone" className="w-100" style={{height: 'auto', backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}/>
                </div>
            </div>
        </div>
    </div>;
}

export default AboutApp;