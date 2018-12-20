/**
 * @author Hanh TD
 * Slider keyword
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import slider01 from '../../images/slider-01.jpg'
import slider02 from '../../images/slider-02.jpg'
import slider03 from '../../images/slider-03.jpg'
import slider04 from '../../images/slider-04.png'
import slider05 from '../../images/slider-05.jpg'

class SliderKeyword extends React.Component {
  render() {
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1
    }

    return (
      <div className="top-result-search">
        <div className="top-result-search-inner">
          <h4 className="top-result-search-title">
            予算から建築実績を探す
          </h4>
          <div className="slider-search-wrap" id="my-slider2">
          <Slider {...settings}>
            <div className="slider-item">
              <Link to="">
                <img src={slider01} />
              </Link>
              <div className="slider-title">
                <h3>ローコスト</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider02} />
              </Link>
              <div className="slider-title">
                <h3>1000万円台</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider03} />
              </Link>
              <div className="slider-title">
                <h3>2000万円台</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider04} />
              </Link>
              <div className="slider-title">
                <h3>3000万円台</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider05} />
              </Link>
              <div className="slider-title">
                <h3>3000万円台</h3>
              </div>
            </div>
          </Slider>
          </div>

          <h4 className="top-result-search-title">
            こだわりから建築実績を探す
          </h4>
          <div className="slider-search-wrap" id="my-slider3">
          <Slider {...settings}>
            <div className="slider-item">
              <Link to="">
                <img src={slider01} />
              </Link>
              <div className="slider-title">
                <h3>狭小住宅</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider02} />
              </Link>
              <div className="slider-title">
                <h3>二世帯住宅</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider03} />
              </Link>
              <div className="slider-title">
                <h3>地下室</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider04} />
              </Link>
              <div className="slider-title">
                <h3>平屋住宅</h3>
              </div>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider05} />
              </Link>
              <div className="slider-title">
                <h3>平屋住宅</h3>
              </div>
            </div>
          </Slider>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(withRouter(SliderKeyword))
