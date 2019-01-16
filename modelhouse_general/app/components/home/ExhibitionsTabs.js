import React from 'react'
import { Container, Row, Col, TabContent, TabPane, Nav } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import classnames from 'classnames'
import I18nUtils from '../../utils/I18nUtils'
import LocationActions from '../../redux/wrapper/LocationsRedux'
import ExhibitionsActions from '../../redux/wrapper/ExhibitionsRedux'
class ExhibitionsTabs extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      activeTab: '0',
      locationList: [],
      exhibitionsListByRegion: [],
      exhibitionsListAll: []
    }

    this.toggle = this.toggle.bind(this)
    this.getLocationList = this.getLocationList.bind(this)
    this.getListExhibition = this.getListExhibition.bind(this)
  }

  getLocationList = () => {
    let data = {
      limit: '',
      offset: '',
      type: 1
    }
    this.props.locationListRequest(data)
  }

  getListExhibition = () => {
    let data = {
      offset: '',
      limit: '10'
    }
    this.props.exhibitionsListRequest(data)
  }

  toggle = (tab) => {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab
      })
    }
    let data = {
      offset: '',
      limit: tab,
      ...(tab && { city__region: tab}),
    }
    // filter exhibition by tab
    this.props.exhibitionsListByRegionRequest(data)
  }

  componentDidMount() {
    this.getLocationList()
    this.getListExhibition()
  }

  componentWillReceiveProps(nextProps) {
    // list location
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListLocation == true) {
        let data = response.data
        this.setState({
          locationList: data
        })
      }
    }

    // list exhibition by region
    if (this.props.dataExhibition != nextProps.dataExhibition) {
      let response = nextProps.dataExhibition
      if (response.isGetListExhByRegion == true) {
        this.setState({
          exhibitionsListByRegion: response.data.results
        })
      }
    }

    // list all exhibition
    if (this.props.dataExhibitionAll != nextProps.dataExhibitionAll) {
      let response = nextProps.dataExhibitionAll
      if (response.isGetListExhibitions == true) {
        this.setState({
          exhibitionsListAll: response.data.results
        })
      }
    }
  }

  render() {
    const {locationList, exhibitionsListByRegion, exhibitionsListAll} = this.state
    return (
      <Container fluid className="top-result">
        <Row className="top-result-inner">
          <Col md="12" xs="12">
            <h2 className="top-result-title">{I18nUtils.t('event-info')}</h2>
            <p className="top-result-text">{I18nUtils.t('event-info-text')}</p>
          </Col>
          <Col md="12" xs="12" className="box-event pc">
            <Nav className="tab">
              <li 
                className={classnames({ current: this.state.activeTab === '0' })}
                onClick={() => { this.toggle('0') }}
              >
                {I18nUtils.t('nation-wide')}
              </li>
              {locationList.map((val, key) => {
                return (
                <li key={key}
                  className={classnames({ current: this.state.activeTab === val.id.toString() })}
                  onClick={() => { this.toggle(val.id.toString()) }}
                >
                  {val.name}
                </li>
                )
              })}
            </Nav>
            <TabContent activeTab={this.state.activeTab} ref={this.myRef}>
              <TabPane tabId="0">
                <div className="tab-content-wrap">
                  <div className="tab-content-inner">
                    {exhibitionsListAll && exhibitionsListAll.map((v, k) => {
                      if (v.is_active) {
                        return (
                        <Link to="" key={k} className="content-item">
                          <span>{v.start_time}</span>
                          <p>{v.title}</p>
                        </Link>
                        )}
                    })}
                  </div>
                </div>
              </TabPane>
              {locationList.map((val, key) => {
                return (
                  <TabPane tabId={val.id.toString()} key={key}>
                    <div className="tab-content-wrap">
                      <div className="tab-content-inner">
                      {exhibitionsListByRegion && exhibitionsListByRegion.map((v, k) => {
                        if (v.is_active) {
                          return (
                            <Link to="" key={k} className="content-item">
                              <span>{v.start_time}</span>
                              <p>{v.title}</p>
                            </Link>
                          )
                        }
                      })}
                      </div>
                    </div>
                  </TabPane>
                )
              })}
            </TabContent>
          </Col>
        </Row>
      </Container>
    )
  }
}

ExhibitionsTabs.propTypes = {
  locationListRequest : PropTypes.func,
  exhibitionsListByRegionRequest: PropTypes.func,
  exhibitionsListRequest: PropTypes.func,
  data: PropTypes.object,
  dataExhibition: PropTypes.object,
  dataExhibitionAll: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data,
    dataExhibition: state.exhibitions.data,
    dataExhibitionAll: state.exhibitions.data,
  }
}

const mapDispatchToProps = dispatch => ({
  locationListRequest: data =>
    dispatch(LocationActions.locationListRequest(data)),
  exhibitionsListByRegionRequest : dataExhibition =>
    dispatch(ExhibitionsActions.exhibitionsListByRegionRequest(dataExhibition)),
  exhibitionsListRequest : dataExhibitionAll =>
    dispatch(ExhibitionsActions.exhibitionsListRequest(dataExhibitionAll)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExhibitionsTabs))
