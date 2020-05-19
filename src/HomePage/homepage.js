import React from 'react';
import {Helmet} from "react-helmet";
import Menu from '../shared/component/Menu'
import Slider from './components/Slider'
import Service from './components/Service'

const HomePage = () => {
    return  <React.Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Teresa</title>
        </Helmet>
        <Menu/>
        <Slider/>
        <Service/>
    </React.Fragment>;
}

export default HomePage;