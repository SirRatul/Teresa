import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../shared/img/front 1.jpg'
import Slider2 from '../../shared/img/front 2.jpg'
import Slider3 from '../../shared/img/front 3.jpg'
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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">


                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block sliderimage"
                src={Slider2}
                alt="Third slide"
            />

            <Carousel.Caption>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">


                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block sliderimage"
                src={Slider3}
                alt="Third slide"
            />

            <Carousel.Caption>
            <div className="container">
                    <div className="row">
                        <div className="col-lg-6">

                          
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>;
}

export default Slider;
