/**
 * @author Hanh TD
 * Top map component
 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col} from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import modelHouse01 from '../../images/model-house01.jpg'
import modelHouse02 from '../../images/model-house02.jpg'
import ModelHousesActions from '../../redux/wrapper/ModelHousesRedux'
class ModelHousesHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modelHouseList : [],
    }
  }
  getListModelHouse = () => {
    let data = {
      offset: 0,
      limit: 8
    }
    this.props.modelHousesListRequest(data)
  }

  componentDidMount() {
    this.getListModelHouse()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListHouse) {
        this.setState({
          modelHouseList: response.data.results,
          count: response.data.count
        })
      }
    }
  }
  render() {
    // let { modelHouseList, count } = this.state
    return (
      <Container fluid className="top-result">
        <Row className="top-result-inner">
          <Col md="12" xs="12">
            <h2 className="top-result-title">{I18nUtils.t('model-house-intro')}</h2>
            <p className="top-result-text">{I18nUtils.t('model-house-search-text')}</p>
          </Col>
          <Col md="12" xs="12" className="top-modelhouse">
            <Row className="top-modelhouse-inner clearfix">
              <Col md="3" xs="6" className="top-modelhouse-once">
                <Link to="">
                  <div className="top-modelhouse-once-img">
                    <img src={modelHouse01} />
                  </div>
                  <span className="top-modelhouse-once-maker-title">
                    エースホーム株式会社
                  </span>
                  <h3 className="top-modelhouse-once-title">
                    HUCK BASE 三河モデルハウス
                  </h3>
                  <span className="top-modelhouse-once-bottom">
                    木造軸組金具工法
                  </span>
                </Link>
                <Link to="" className="connected-post">
                  HUCK BASE 三河モデルハウス
                </Link>
              </Col>
              
              <Col md="3" xs="6" className="top-modelhouse-once">
                <Link to="">
                  <div className="top-modelhouse-once-img">
                    <img src={modelHouse02} />
                  </div>
                  <span className="top-modelhouse-once-maker-title">
                    エースホーム株式会社
                  </span>
                  <h3 className="top-modelhouse-once-title">
                    HUCK BASE 三河モデルハウス
                  </h3>
                  <span className="top-modelhouse-once-bottom">
                    木造軸組金具工法
                  </span>
                </Link>
                <Link to="" className="connected-post">
                  HUCK BASE 三河モデルハウス
                </Link>
              </Col>
              
              <Col md="3" xs="6" className="top-modelhouse-once">
                <Link to="">
                  <div className="top-modelhouse-once-img">
                    <img src={modelHouse01} />
                  </div>
                  <span className="top-modelhouse-once-maker-title">
                    エースホーム株式会社
                  </span>
                  <h3 className="top-modelhouse-once-title">
                    HUCK BASE 三河モデルハウス
                  </h3>
                  <span className="top-modelhouse-once-bottom">
                    木造軸組金具工法
                  </span>
                </Link>
                <Link to="" className="connected-post">
                  HUCK BASE 三河モデルハウス
                </Link>
              </Col>
              
              <Col md="3" xs="6" className="top-modelhouse-once">
                <Link to="">
                  <div className="top-modelhouse-once-img">
                    <img src={modelHouse02} />
                  </div>
                  <span className="top-modelhouse-once-maker-title">
                    エースホーム株式会社
                  </span>
                  <h3 className="top-modelhouse-once-title">
                    HUCK BASE 三河モデルハウス
                  </h3>
                  <span className="top-modelhouse-once-bottom">
                    木造軸組金具工法
                  </span>
                </Link>
                <Link to="" className="connected-post">
                  HUCK BASE 三河モデルハウス
                </Link>
              </Col>
            </Row>
            <div className="detail-btn-wrap clearfix">
              <div className="detail-btn">
                <Link to="/modelhouse">
                  もっと見る
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

ModelHousesHome.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  modelHousesListRequest: PropTypes.func,
  locationListRequest : PropTypes.func,
}

const mapStateToProps = state => {
  return {
    processing : state.modelHouses.processing,
    data : state.modelHouses.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  modelHousesListRequest : data =>
    dispatch(ModelHousesActions.modelHousesListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ModelHousesHome))
