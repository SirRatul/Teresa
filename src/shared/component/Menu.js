import React, {useState, useContext} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {Cookies} from 'react-cookie';
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import LoginButton from '../img/Login Button.png'
import NotificationIcon from '../img/Notification Icon.png'
import Modal from "../component/Modal";
import {AuthContext} from '../context/auth-context'
import './Menu.css'

const Menu = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const cookies = new Cookies()
    const [visible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const searchButtonClick = () => {
        setVisible(!visible)
    }
    /* axios.interceptors.request.use((config) => {
            config.headers.authorization = `Bearer ${auth.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    ) */
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            Authorization : `Bearer ${auth.token}`
        } 
    })
    const logoutHandler = async () => {
        console.log('test')
        console.log(auth.token)
        try {
            /* const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'users/logout', {
                headers: {
                    Authorization : `Bearer ${auth.token}`
                } 
            }); */
            const response = await authAxios.post('users/logout');
            console.log(response.data);
            auth.userId = null
            auth.isLoggedIn = false
            auth.token = null
            cookies.remove('userId', {path: '/'})
            cookies.remove('token', {path: '/'})
            cookies.remove('isLoggedIn', {path: '/'})
            history.push('/')
        } catch (error) {
            console.log(error.response.data.error);
            setErrorMessage(error.response.data.error)
        }
    }
    const modalHandler = () => {
        setErrorMessage(null)
    };
    return  <Navbar className="my-nav" expand="lg" sticky="top">
        {errorMessage &&<Modal message={errorMessage} onClear={modalHandler.bind(this)}/>}
        <Navbar.Brand href="/">
            <img src={Logo} width="100" height="70" className="d-inline-block align-top" alt="Logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="fas fa-bars text-light"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
            <ul className="navbar-nav ml-auto">
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">My Health Record</Nav.Link>
                </Nav.Item>
                <NavDropdown 
                    className="justify-content-center"
                    title={
                        <span className="dropdown-toggle text-white" data-toggle="dropdown" style={{backgroundColor: '#020624'}}>Buy Medicine
                            <i className="fa fa-angle-down ml-1"></i>
                        </span>
                    } id="basic-nav-dropdown">
                        <NavDropdown.Item className="justify-content-lg-center text-white" href="/upload-prescription">
                            Upload Prescription
                        </NavDropdown.Item>
                        <NavDropdown.Item className="justify-content-lg-center text-white">
                            Medicine
                        </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/set-reminder">Set Reminder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Products</Nav.Link>
                </Nav.Item>
                {
                    auth.isLoggedIn?
                    <Nav.Item>
                        <Nav.Link className="text-light">
                            <button className="btn-lg-block rounded-pill" onClick={logoutHandler}>Logout</button>
                        </Nav.Link>
                    </Nav.Item>
                    :
                    <Nav.Item>
                        <Nav.Link className="text-light mt-lg-n2" href="/login">
                            <img src={LoginButton} className="ml-n2 ml-lg-0 login-button" alt="Login Button"/>
                        </Nav.Link>
                    </Nav.Item>
                }
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">
                        <img className='mt-lg-n2 ml-3 ml-lg-0 notification-button' src={NotificationIcon} alt="Notification Icon"/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">
                        <img className='ml-3 ml-lg-0 mt-0 mt-lg-n2 avatar-icon' src={Avatar} alt="Avatar"/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <i className="fas fa-search mt-4 mt-lg-1 mt-xl-2 ml-4 ml-xl-0" onClick={function(){searchButtonClick()}}></i>
                </Nav.Item>
                <form className={"search-form-nav "+(visible?'visible':'invisible')} role="search">
                    <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                    </div>
                </form>
            </ul>
        </Navbar.Collapse>
    </Navbar>;
}

export default Menu;
