/**
 * @author Nam NH
 * StoreListModal component
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import OutletStoreActions from '../redux/wrapper/OutletStoresRedux'
import I18nUtils from '../utils/I18nUtils'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'

class StoreListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      total: 10,
      storeList: [],
      selectedStore: {}
    }
    this.onPageChange = this.onPageChange.bind(this)
  }

  componentDidMount() {
    this.props.outletStoreListRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.isGetStoreList) {
        this.setState({
          storeList: response.data.slice(0, 10)
        })
      }
    }
  }

  toggle = () => {
    this.props.toggle(false)
  }

  onPageChange(page) {
    this.setState({ page })
  }

  focusStore = (item) => {
    this.setState({
      selectedStore: item
    })
  }

  selectStore = () => {
    this.props.selectStore(this.state.selectedStore)
  }

  render() {
    let { page, total, storeList, selectedStore } = this.state
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{I18nUtils.t('store-selection')}</ModalHeader>
        <ModalBody className="search-modal">
          <InputGroup>
            <Input type="text" name="search" id="search" />
            <InputGroupAddon addonType="append">
              <Button type="button" color="primary">{I18nUtils.t('search')}</Button>
            </InputGroupAddon>
          </InputGroup>
          <UltimatePagination
            currentPage={page}
            totalPages={total}
            onChange={this.onPageChange}
          />
          <ListGroup>
            {storeList.map((item, key) => {
              return (
                <ListGroupItem
                  key={key}
                  className={item.id == selectedStore.id && 'selected'}
                  onClick={() => this.focusStore(item)}
                  onDoubleClick={this.selectStore}
                >
                  {item.title}
                </ListGroupItem>)
            })}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.selectStore}>{I18nUtils.t('select')}</Button>{' '}
          <Button color="warning" onClick={this.toggle}>{I18nUtils.t('cancel')}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

StoreListModal.propTypes = {
  history: PropTypes.object,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  response: PropTypes.object,
  outletStoreListRequest: PropTypes.func,
  selectStore: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    response: state.outletStores.data
  }
}

const mapDispatchToProps = dispatch => ({
  outletStoreListRequest: data =>
    dispatch(OutletStoreActions.outletStoreListRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoreListModal))
