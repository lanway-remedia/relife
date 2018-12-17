/**
 * @author Nam NH
 * StoreListModal component
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  InputGroup,
  Input,
  InputGroupAddon
} from 'reactstrap'
import OutletStoreActions from '../redux/wrapper/OutletStoresRedux'
import I18nUtils from '../utils/I18nUtils'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'

const LIMIT = 10

class StoreListModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      count: 0,
      storeList: [],
      selectedStore: {}
    }
  }

  componentDidMount() {
    let data = {
      offset: 0,
      limit: LIMIT
    }
    this.props.outletStoreListRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.isGetStoreList) {
        this.setState({
          storeList: response.data.results,
          count: response.data.count
        })
      }
    }
  }

  toggle = () => {
    this.props.toggle(false)
  }

  onPageChange = page => {
    this.setState({ page })
    let data = {
      offset: (page - 1) * LIMIT,
      limit: LIMIT
    }
    this.props.outletStoreListRequest(data)
  }

  focusStore = item => {
    this.setState({
      selectedStore: item
    })
  }

  selectStore = () => {
    this.props.selectStore(this.state.selectedStore)
  }

  getPagedData = () => {}

  render() {
    let { page, count, storeList, selectedStore } = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / LIMIT)
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
          {I18nUtils.t('store-selection')}
        </ModalHeader>
        <ModalBody className="search-modal">
          <InputGroup>
            <Input type="text" name="search" id="search" />
            <InputGroupAddon addonType="append">
              <Button type="button" color="primary">
                {I18nUtils.t('search')}
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {count > 0 && (
            <UltimatePagination
              currentPage={page}
              totalPages={pagesCount}
              onChange={this.onPageChange}
            />
          )}
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
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.selectStore}>
            {I18nUtils.t('select')}
          </Button>{' '}
          <Button color="warning" onClick={this.toggle}>
            {I18nUtils.t('cancel')}
          </Button>
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
