import React from 'react';
import AboutTeresaPhoto from '../../shared/img/About Us.jpg';
import './AboutTeresa.css'

const AboutTeresa = () => {
    return  <div className="container-fluid" style={{backgroundColor: '#F1F5F8'}}>
        <div className="container">
            <img className="d-block about-teresa" src={AboutTeresaPhoto} alt="About Us"/>
        </div>
    </div>;
}

export default AboutTeresa;