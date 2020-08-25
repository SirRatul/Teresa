import React from 'react';
// import Avatar from '../img/avatar.png'
// import NotificationIcon from '../img/Notification Icon.png'
import './AdminMenu.css'

const AdminMenu = () => {
    return <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bell"></i>
        </a>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
            {/* <img src={Avatar} className="img-circle elevation-2 mt-n2" alt="User Image" /> */}
            {/* <img src={NotificationIcon} className="img-circle elevation-2 mt-n2" alt="User Image" /> */}
            <i class="fa fa-user" aria-hidden="true"></i>
            <span className="h5">  Ayon Mahmud</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i class="fas fa-door-closed"></i>
        </a>
      </li>
    </ul>
  </nav>;
};

export default AdminMenu;