/**
 * @author Hanh TD
 * Slider keyword
 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import Slider from 'react-slick'

import slider01 from '../../images/slider-01.jpg'
import slider02 from '../../images/slider-02.jpg'
import slider03 from '../../images/slider-03.jpg'
import slider04 from '../../images/slider-04.jpg'
import slider05 from '../../images/slider-05.jpg'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../utils/I18nUtils'

class SliderKeyword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listPrice: [],
    }
  }
  componentDidMount() {
    let data = {
      limit: '',
      offset: '' 
    }
    this.props.attributePriceListRequest(data)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      //list price range
      if (response.isGetListPrice) {
        this.setState({
          listPrice: response.data
        })
      }
    }
  }
  render() {
    const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    }
    let { listPrice } = this.state
    let arrImgPrice = [slider01, slider02, slider03, slider04, slider05]

    return (
      <Container fluid className="top-result-search padding-0">
        <Row className="top-result-search-inner">
          <Col md="12" xs="12">
            <h4 className="top-result-search-title">
              {I18nUtils.t('search-from-price')}
            </h4>
          </Col>
          <div className="slider-search-wrap" id="my-slider2">
            <Slider {...settings}>
              {listPrice.map((val, key) => (
                <div className="slider-item" key={key}>
                <Link to={`example/?price_range__in=${val.id}`}>
                  <img src={arrImgPrice[key % 5]} />
                  <div className="slider-title">
                    <h3>{val.title}</h3>
                  </div>
                </Link>
                </div>
              ))}
            </Slider>
          </div>

          <Col md="12" xs="12">
            <h4 className="top-result-search-title">
              {I18nUtils.t('search-from-performance')}
            </h4>
          </Col>
          <div className="slider-search-wrap" id="my-slider3">
          <Slider {...settings}>
            {listPrice.map((val, key) => (
              <div className="slider-item" key={key}>
              <Link to={`example/?price_range__in=${val.id}`}>
                <img src={arrImgPrice[key % 5]} />
                <div className="slider-title">
                  <h3>{val.title}</h3>
                </div>
              </Link>
              </div>
            ))}
          </Slider>
          </div>
        </Row>
      </Container>
    )
  }
}

SliderKeyword.propTypes = {
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributePriceListRequest: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  attributePriceListRequest: data =>
    dispatch(AttributeActions.attributePriceListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SliderKeyword))
