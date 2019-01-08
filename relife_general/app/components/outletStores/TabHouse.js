import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Row, Col} from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'
class TabHouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      houseList: [],
    }
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.storeId != nextProps.storeId) {
      let storeId = nextProps.storeId
      let dataHouseByStoreId = {
        limit: '',
        store_id :storeId,
        offset: ''
      }
      this.props.exampleHousesListByStoreRequest(dataHouseByStoreId)
    }
      if (this.props.data != nextProps.data) {
        let response = nextProps.data
        if (response.isListHouseByStore) {
          this.setState({
            houseList: response.data
          })
        }
      }
  }
  render () {
    let {houseList} = this.state
    return (
      <Row className="tab-content-item clearfix">
        {houseList.map((val, key) => (
          <Col xs="6" md="3" key={key} className="tab-house detail-list ">
            <Link to={'/example/'+val.id} className="detail-list-once">
              <div className="detail-list-once-img">
                <img src={val.img_large} />
              </div>
              <h3 className="detail-list-once-title">{val.title}</h3>
              <div className="detail-list-once-company-area">{val.address}</div>
              <div className="detail-list-once-company">{val.store.title}</div>
            </Link>
          </Col>
          ))}
      </Row>
    )
  }
}
TabHouse.propTypes = {
  exampleHousesListByStoreRequest : PropTypes.func,
  storeId: PropTypes.number,
  data: PropTypes.object
}
const mapStateToProps = state => {
  return {
    processing : state.exampleHouses.processing,
    data: state.exampleHouses.data
  }
}

const mapDispatchToProps = dispatch => ({
  exampleHousesListByStoreRequest : data => dispatch(ExampleHousesActions.exampleHousesListByStoreRequest(data)),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TabHouse))
