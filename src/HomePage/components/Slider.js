import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../shared/img/front 1.jpg'
import Slider2 from '../../shared/img/front 2.jpg'
import Slider3 from '../../shared/img/front 3.jpg'
import { Link } from "react-scroll";
import './Slider.css'

const Slider = () => {
    return  <Carousel>
        <Carousel.Item>
            <img
                className="d-block sliderimage"
                src={Slider1}
                alt="First slide"
            />
            <Carousel.Caption>
                <Link className="nav-link text-light" to="about-teresa" spy={true} smooth={true} offset={-70} duration={500} style={{ cursor: "pointer" }}>
                    <button className="btn bg-white float-left rounded-pill font-weight-bold marginSliderButton mb-lg-5" style={{color: '#080808'}}>Learn More</button>
                </Link>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-sm bg-white float-left rounded-pill font-weight-bold" style={{color: '#080808'}}>Learn More</button>
                        </div>
                    </div>
                </div> */}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block sliderimage"
                src={Slider2}
                alt="Second slide"
            />

            <Carousel.Caption>
                <Link className="nav-link text-light" to="about-teresa" spy={true} smooth={true} offset={-70} duration={500} style={{ cursor: "pointer" }}>
                    <button className="btn bg-white float-left rounded-pill font-weight-bold marginSliderButton mb-lg-5" style={{color: '#080808'}}>Learn More</button>
                </Link>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-sm bg-white float-left rounded-pill font-weight-bold" style={{color: '#080808'}}>Learn More</button>
                        </div>
                    </div>
                </div> */}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block sliderimage"
                src={Slider3}
                alt="Third slide"
            />

            <Carousel.Caption>
                <Link className="nav-link text-light" to="about-teresa" spy={true} smooth={true} offset={-70} duration={500} style={{ cursor: "pointer" }}>
                    <button className="btn bg-white float-left rounded-pill font-weight-bold marginSliderButton mb-lg-5" style={{color: '#080808'}}>Learn More</button>
                </Link>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-6">
                            
                        </div>
                    </div>
                </div> */}
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>;
}

export default Slider;
