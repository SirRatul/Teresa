import React from "react";
import { Helmet } from "react-helmet";
import Menu from "../shared/component/Menu";
import Slider from "./components/Slider";
import Service from "./components/Service";
import AboutTeresa from "../HomePage/components/AboutTeresa";
import AboutApp from "../HomePage/components/AboutApp";
import Footer from "../shared/component/Footer";
import Process from "../HomePage/components/Process";

const HomePage = () => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Teresa</title>
      </Helmet>
      <Menu />
      <Slider />
      <Service />
      <AboutTeresa id="about-teresa"/>
      <AboutApp />
      <Process />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
