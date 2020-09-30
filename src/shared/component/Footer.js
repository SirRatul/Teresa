import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import ListGroup from 'react-bootstrap/ListGroup'
import './Footer.css'

const Footer = () => {
    return <footer className="page-footer" style={{backgroundColor: '#020624'}}>
        <div className="container-fluid text-center text-sm-left">
            {/* <div className="row">
                <div className="col-sm-4 mx-auto">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">My Health Record</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="/upload-prescription">Buy Medicine</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="/set-reminder">Set Reminder</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Services</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Products</a>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <hr className="bg-white w-100 d-sm-none"/>
                <div className="col-sm-4 mx-auto">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Need Help</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">About Us</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Contact Us</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Health Tips</a>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <hr className="bg-white w-100 d-sm-none"/>
                <div className="col-sm-4 mx-auto">
                    <ListGroup>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Privacy</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Accessibility</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Copyright</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Disclaimer</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Terms of use</a>
                        </ListGroup.Item>
                        <ListGroup.Item className='listgroup-style'>
                            <a className='font-weight-normal text-light' href="#!">Service Availability</a>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <hr className="bg-white w-100 d-sm-none"/>
                </div> */}
                <br/>
                <div className="row">
                <div className="col-6">
                    <p className="footer-copyright-text text-light pt-2">Copyright &copy; All right reserved</p>
                </div>
                <div className="col-6">
                    <ButtonGroup className='float-right' aria-label="Basic example">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCSQjPxNGkdZVXxnl41C2ccQ"><Button className="footer-icon"><i className="fab fa-youtube"></i></Button></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/teresasmartcare"><Button className="footer-icon"><i className="fab fa-facebook-f"></i></Button></a>
                        {/* <Button className="footer-icon"><i className="fab fa-instagram"></i></Button>
                        <Button className="footer-icon"><i className="fab fa-twitter"></i></Button> */}
                    </ButtonGroup>
                </div>
            </div>
        </div>
    </footer>;
};

export default Footer;