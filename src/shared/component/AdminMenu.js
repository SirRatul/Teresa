import React, {useContext} from 'react';
// import Avatar from '../img/avatar.png'
// import NotificationIcon from '../img/Notification Icon.png'
import {useHistory, Link} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import {AuthContext} from '../context/auth-context'
import axios from 'axios'
import './AdminMenu.css'

const AdminMenu = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const cookies = new Cookies()
  
  const authAdminAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        Authorization : `Bearer ${auth.adminToken}`
    } 
  })
  const adminLogout = async() => {
    console.log('admin logout')
    try {
        const response = await authAdminAxios.post(process.env.REACT_APP_BACKEND_URL+'admin/logout');
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
    auth.adminUserId = null
    auth.isLoggedInAdmin = false
    auth.adminToken = null
    auth.adminUserName = null
    auth.medicineDetails = null
    auth.sellerName = null
    auth.sellerPhone = null
    cookies.remove('adminUserId', {path: '/'})
    cookies.remove('adminUserName', {path: '/'})
    cookies.remove('adminToken', {path: '/'})
    cookies.remove('isLoggedInAdmin', {path: '/'})
    history.push('/admin')
  }
  return <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
        <li className="nav-item">
        {/* <a className="nav-link" data-widget="pushmenu" href="#/" role="button"><i className="fas fa-bars" /></a> */}
        <Link to="#/" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></Link>
        </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
        
        {/* <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#/" role="button">
              <i className="fas fa-bell" />
          </a>
        </li> */}
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#/">
            {/* <img src={Avatar} className="img-circle elevation-2 mt-n2" alt="User Image" /> */}
            {/* <img src={NotificationIcon} className="img-circle elevation-2 mt-n2" alt="User Image" /> */}
            <i className="fa fa-user" aria-hidden="true" />
              <span className="h5">  {auth.adminUserName}</span>
        </a>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={adminLogout}>
          <i className="fas fa-sign-out-alt" />
        </button>
      </li>
    </ul>
  </nav>;
};

export default AdminMenu;