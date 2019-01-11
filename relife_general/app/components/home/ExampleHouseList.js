/**
 * @author Hanh TD
 * Top map component
 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col} from 'reactstrap'
import Slider from 'react-slick'
import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'

class ExampleHouseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exampleHouseList : [],
    }
  }
  getListExampleHouse = () => {
    let data = {
      offset: 0,
      limit: 10
    }
    this.props.exampleHousesListRequest(data)
  }

  componentDidMount() {
    this.getListExampleHouse()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        this.setState({
          exampleHouseList: response.data.results,
          count: response.data.count
        })
      }
    }
  }
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
    let { exampleHouseList } = this.state
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
            {exampleHouseList.map((val, key) => (
              <div className="slider-item" key={key}>
                <Link to={`/example/${val.id}`}>
                  <img src={val.img_large} />
                  <div className="slider-title">
                    <h3>{val.title}</h3>
                    <p>{val.store && (val.store.title)}</p>
                  </div>
                </Link>
              </div>))}
          </Slider>
        </div>
      </Container>
    )
  }
}

ExampleHouseList.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  exampleHousesListRequest: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    processing : state.exampleHouses.processing,
    data : state.exampleHouses.data,
  }
}

const mapDispatchToProps = dispatch => ({
  exampleHousesListRequest : data =>
    dispatch(ExampleHousesActions.exampleHousesListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExampleHouseList))
