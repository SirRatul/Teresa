import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import LoginButton from '../img/Login Button.png'
import './Menu.css'

const Menu = () => {
    return  <Navbar className="my-nav" expand="lg" sticky="top">
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
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Products</Nav.Link>
                </Nav.Item>
                <NavDropdown 
                    className="justify-content-center"
                    title={
                        <span className="dropdown-toggle text-white" data-toggle="dropdown" style={{backgroundColor: '#020624'}}>Buy Medicine
                            <i className="fa fa-angle-down ml-1"></i>
                        </span>
                    } id="basic-nav-dropdown">
                        <NavDropdown.Item className="justify-content-lg-center text-white" href="/">
                            Upload Prescription
                        </NavDropdown.Item>
                        <NavDropdown.Item className="justify-content-lg-center text-white">
                            Medicine
                        </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Service</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">Set Reminder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light mt-lg-n2" href="/">
                        <img src={LoginButton} alt="" style={{marginLeft: '-20px', width: '110px', height: '45px'}}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="text-light" href="/">
                        <img src={Avatar} alt="" style={{width: '30px', height: '30px'}}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="search-box">
                    <input className="search-txt" type="text" placeholder="Search"/>
                    <button className="search-btn" href="#">
                        <i className="fas fa-search"></i>
                    </button>
                </Nav.Item>
            </ul>
        </Navbar.Collapse>
    </Navbar>;
}

export default Menu;
