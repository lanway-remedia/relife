import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import I18nUtils from '../../utils/I18nUtils'
import TabIntroduction from './../../components/outletStores/TabIntroduction'
import TabHouse from './../../components/outletStores/TabHouse'
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
      <div className="lower-contents one-column">
        <div className="lower-contents-inner clearfix">
        <section className="main">
          <h1 className="page-title detail-title">
            {outletStore.title}
          </h1>
          <div className="detail-img">
            <img src={outletStore.img_large} />
          </div>
          <div className="tab-wrap">
            <ul className="tab top">
                <li className="current">会社紹介</li>
                <li className="">建築実例</li>
                <li className="">資料請求</li>
            </ul>
            <div className="content-wrap">
              {/* <TabIntroduction /> */}
              <TabHouse storeId={outletStore.id} />
            </div>
            <div className="tab-bottom">
            <ul className="tab bottom">
                <li className="current">会社紹介</li>
                <li className="">建築実例</li>
                <li className="">資料請求</li>
            </ul>
            </div>

          </div>
        </section>
        </div>
      </div>
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
