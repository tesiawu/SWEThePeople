import React, { Component } from 'react';
import Slider from 'react-slick';
import header from './assets/images/header.png'
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic1 from './assets/images/splash-screen/pic1.jpg'
import pic2 from './assets/images/splash-screen/pic2.jpg'
import pic3 from './assets/images/splash-screen/pic3.jpg'

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.settings = {
      dots: true,
      infinite: true,
      speed: 300,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      centerMode: true,
      autoplaySpeed: 4000,
      pauseOnHover: true
    }
  }
  render() {
    var pics = [pic1, pic2, pic3]

    return (
      <div className="App">
      <header className="App-header">
          <img src={header} className="App-logo" alt="logo" />
        </header>
      <div className="carousel-parent">
          <Slider {...this.settings} className="carousel">

          {pics.map((item) => (
              <div><img src={item} alt=""/></div>
          ))}

          </Slider>
      </div>
      </div>
    )
  }
}
