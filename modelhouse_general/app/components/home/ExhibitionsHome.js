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

import ExhibitionsActions from '../../redux/wrapper/ExhibitionsRedux'

class ExhibitionsHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exhibitionsList: []
    }
  }

  getListExhibition = () => {
    let data = {
      offset: 0,
      limit: 12
    }
    this.props.exhibitionsListRequest(data)
  }

  componentDidMount() {
    this.getListExhibition()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListExhibitions) {
        this.setState({
          exhibitionsList: response.data.results
        })
      }
    }
  }
  render() {
    const {exhibitionsList} = this.state
    return (
      <Container fluid className="top-result">
        <Row className="top-result-inner">
          <Col md="12" xs="12">
            <h2 className="top-result-title">{I18nUtils.t('exhibitions-intro')}</h2>
            <p className="top-result-text">{I18nUtils.t('exhibitions-intro-text')}</p>
          </Col>
          <Col md="12" xs="12" className="top-exhibition">
            <Row className="top-exhibition-inner clearfix">
              {exhibitionsList && exhibitionsList.map((val, key) => {
                if (val.is_active) {
                  return (
                    <Col md="12" xs="12" key={key} className="top-exhibition-once clearfix">
                      <Link to="/exhibition">
                        <h3 className="top-exhibition-once-title">
                          {val.title}
                        </h3>
                        <span className="top-exhibition-once-info address">
                          {val.address}
                        </span>
                        <br />
                        <span className="top-exhibition-once-info tel">
                          018-855-5333
                        </span>
                        <br />
                        <span className="top-exhibition-once-info open-house">
                          {val.start_time} / 
                        </span>
                        <span className="top-exhibition-once-info holiday">
                          定休日：-
                        </span>
                      </Link>
                    </Col>
                  )
                }
              })}
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

ExhibitionsHome.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  exhibitionsListRequest: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    processing : state.exhibitions.processing,
    data : state.exhibitions.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  exhibitionsListRequest : data =>
    dispatch(ExhibitionsActions.exhibitionsListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExhibitionsHome))
