/**
 * @author Hanh TD
 * Top map component
 */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col} from 'reactstrap'
import Slider from 'react-slick'
import slider01 from '../../images/slider-01.jpg'
import slider02 from '../../images/slider-02.jpg'
import slider03 from '../../images/slider-03.jpg'
import slider04 from '../../images/slider-04.png'
import slider05 from '../../images/slider-05.jpg'

class ExampleHouseList extends React.Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '25%',
      slidesToShow: 1,
      speed: 600,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            centerPadding: '15%',
          }
        }
      ]
    }
    return (
      <Container fluid className="top-result">
        <Row className="top-result-inner">
          <Col md="12" xs="12">
            <h2 className="top-result-title">注文住宅の建築実績を見る</h2>
            <p className="top-result-text">こだわり住まいのさまざまな情報を、注文住宅の事例からお探しできます。</p>
          </Col>
        </Row>
        <div className="slider-wrap">
          <Slider {...settings}>
            <div className="slider-item">
              <Link to="">
                <img src={slider01} />
                <div className="slider-title">
                  <h3>ゆっくりとした時間が流れる家</h3>
                  <p>株式会社クレアホームの</p>
                </div>
              </Link>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider02} />
                <div className="slider-title">
                  <h3>ゆっくりとした時間が流れる家</h3>
                  <p>株式会社クレアホームの</p>
                </div>
              </Link>
              
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider03} />
                <div className="slider-title">
                  <h3>ゆっくりとした時間が流れる家</h3>
                  <p>株式会社クレアホームの</p>
                </div>
              </Link>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider04} />
                <div className="slider-title">
                  <h3>ゆっくりとした時間が流れる家</h3>
                  <p>株式会社クレアホームの</p>
                </div>
              </Link>
            </div>
            <div className="slider-item">
              <Link to="">
                <img src={slider05} />
                <div className="slider-title">
                  <h3>ゆっくりとした時間が流れる家</h3>
                  <p>株式会社クレアホームの</p>
                </div>
              </Link>
            </div>
          </Slider>
        </div>
      </Container>
    )
  }
}
export default connect()(withRouter(ExampleHouseList))
