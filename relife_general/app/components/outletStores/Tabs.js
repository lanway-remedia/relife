import React from 'react'
import { TabContent, TabPane, Nav, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import TabIntroduction from './../../components/outletStores/TabIntroduction'
import TabHouse from './../../components/outletStores/TabHouse'
import I18nUtils from '../../utils/I18nUtils'
class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      activeTab: '1'
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle = (tab) => {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render () {
    return (
      <div>
        <Nav className="tab top">
            <li 
              className={classnames({ current: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
            >
              {I18nUtils.t('store-intro-title')}
            </li>
            <li 
              className={classnames({ current: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2') }}
            >
              {I18nUtils.t('example-house-title')}
            </li>
            <li 
              className={classnames({ current: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3') }}
            >
              {I18nUtils.t('infomation-request')}
            </li>
        </Nav>
        <TabContent activeTab={this.state.activeTab} ref={this.myRef}>
          <TabPane tabId="1">
            <TabIntroduction outletStore={this.props.outletStore} />
          </TabPane>
          <TabPane tabId="2">
            <TabHouse storeId={this.props.storeId} />
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Tab 3 Contents</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Nav className="tab bottom">
            <li 
              className={classnames({ current: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1') }}
            >
              {I18nUtils.t('store-intro-title')}
            </li>
            <li 
              className={classnames({ current: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2') }}
            >
              {I18nUtils.t('example-house-title')}
            </li>
            <li 
              className={classnames({ current: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3') }}
            >
              {I18nUtils.t('infomation-request')}
            </li>
        </Nav>
      </div>
    )
  }
}

Tabs.propTypes = {
  storeId: PropTypes.number,
  outletStore: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

export default connect()(withRouter(Tabs))
