import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import './Footer.css'

const Footer = () => {
    return <footer className="page-footer w-100" style={{backgroundColor: '#020624'}}>
        <div className='container'>
            <div className="row first-footer-row">
                <div className="col-6 col-sm-4 mt-3">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style text-light'>My Health Record</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Buy Medicine</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Set Reminder</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Services</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Products</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-6 col-sm-4 mt-3">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style text-light'>Need Help</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>About Us</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Contact Us</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Health Tips</ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-6 col-sm-4 mt-3">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style text-light'>Privacy</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Accessibility</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Copyright</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Disclaimer</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Terms of use</ListGroup.Item>
                        <ListGroup.Item className='listgroup-style text-light'>Service Availability</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <p className="footer-copyright-text text-light pt-2">Copyright &copy; All right reserved</p>
                </div>
                <div className="col-6">
                    <ButtonGroup className='float-right' aria-label="Basic example">
                        <Button className="footer-icon"><i class="fab fa-youtube"></i></Button>
                        <Button className="footer-icon"><i class="fab fa-facebook-f"></i></Button>
                        <Button className="footer-icon"><i class="fab fa-instagram"></i></Button>
                        <Button className="footer-icon"><i class="fab fa-twitter"></i></Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    </footer>;
};

export default Footer;