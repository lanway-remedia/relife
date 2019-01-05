import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Row, Col} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'

import Tabs from './../../components/outletStores/Tabs'

class OutletStoresViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      outletStore: [] 
    }
  }

  getOutletStore = () => {
    let id = this.props.match.params.id
    this.props.outletStoresGetRequest(id)
  }

  componentDidMount() {
    this.getOutletStore()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetStore) {
        this.setState({
          outletStore: response.data
        })
      }
    }
  }

  render() {
    let { outletStore } = this.state
    return (
      <Container fluid className="lower-contents one-column">
        <Row className="lower-contents-inner clearfix">
          <Col xs="12" md="12" className="padding-0">
            <section className="main">
              <h1 className="page-title detail-title">
                {outletStore.title}
              </h1>
              <div className="detail-img">
                <img src={outletStore.img_large} />
              </div>
              <div className="tab-wrap">
                <Tabs storeId={outletStore.id} outletStore={outletStore} />
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data
  }
}

OutletStoresViewPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  outletStoresGetRequest: PropTypes.func,
  match: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({
  outletStoresGetRequest: data =>
    dispatch(OutletStoreActions.outletStoresGetRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OutletStoresViewPage))
