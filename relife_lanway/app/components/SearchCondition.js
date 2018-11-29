import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StoreListModal from '../components/StoreListModal'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Collapse, CardBody, Card
} from 'reactstrap'

const TIMEOUT = 500

const initialState = {
  freeword: '',
  group: 0,
  store: {},
  showStoreList: false
}

class SearchCondition extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      ...initialState,
      collapse: false,
      timeout: TIMEOUT
    }
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    this.setState({
      freeword: params.get('freeword') || '',
      group: params.get('group') || 0,
      store: params.get('store') ? { id: params.get('store'), title: params.get('store_title') } : {},
      collapse: !!(params.get('freeword') || params.get('group') || params.get('store')),
      timeout: params.get('freeword') || params.get('group') || params.get('store') ? 0 : TIMEOUT
    })
  }

  onclickSubmit = () => {
    let { freeword, group, store } = this.state
    let parsed = {
      ...(freeword && {freeword: freeword}),
      ...(group && group != 0 && {group: group}),
      ...(store.id && {store: store.id}),
      ...(store.title && {store_title: store.title})
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}`
    })
  }

  handleResetForm = () => {
    this.setState(initialState)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showStoreListHandle = () => {
    this.setState({
      showStoreList: true
    })
  }

  toggleHandle = isOpen => {
    this.setState({
      showStoreList: isOpen
    })
  }

  selectStore = selectedStore => {
    this.setState({
      store: selectedStore,
      showStoreList: false
    })
  }

  handleShowHideForm = () => {
    this.setState({
      timeout: TIMEOUT
    }, () => {
      this.setState({ collapse: !this.state.collapse })
    })
  }

  render() {
    let { hasFreeword, hasGroup, hasStore } = this.props
    let { showStoreList, collapse, freeword, group, store, timeout } = this.state
    return (
      <div className="filter-group mb-5">
        <label
          className="lb-search"
          onClick={this.handleShowHideForm}
          title={I18nUtils.t('lb-fil-tooltip')}
        >
          {I18nUtils.t('lb-ad-search')}
          <i className={collapse ? 'fa fa-angle-up' : 'fa fa-angle-down'} aria-hidden="true" />
        </label>
        <Collapse isOpen={collapse} timeout={timeout}>
          <Card>
            <CardBody>
              <StoreListModal
                isOpen={showStoreList}
                toggle={isOpen => this.toggleHandle(isOpen)}
                selectStore={selectedStore => this.selectStore(selectedStore)}
              />
              <Form
                onSubmit={this.handleSubmit}
                ref={f => (this.form = f)}
              >
                <Row>
                  {hasFreeword &&
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="freeword">
                          {hasFreeword.title}
                        </Label>
                        <Input
                          type="text"
                          name="freeword"
                          id="freeword"
                          placeholder={hasFreeword.title}
                          value={freeword}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                  }
                  {hasGroup &&
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="group">{I18nUtils.t('group-selection')}</Label>
                        <Input type="select" name="group" id="group" onChange={this.handleChange} value={group}>
                          <option value={0}>---</option>
                          <option value={4}>{I18nUtils.t('group-4')}</option>
                          <option value={3}>{I18nUtils.t('group-3')}</option>
                          <option value={2}>{I18nUtils.t('group-2')}</option>
                          <option value={1}>{I18nUtils.t('group-1')}</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  }
                  {hasStore &&
                    <Col xs="12" md="4">
                      <FormGroup>
                        <Label for="store">{I18nUtils.t('store-selection')}</Label>
                        <InputGroup>
                          <Input type="text" name="store" id="store" value={store.title || ''} disabled />
                          <InputGroupAddon addonType="append">
                            <Button type="button" color="secondary" onClick={this.showStoreListHandle}>{I18nUtils.t('store-selection')}</Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  }
                  <Col xs="12" md="12">
                    <div className="btns-group text-center mt-2">
                      <Button color="success" onClick={this.onclickSubmit}>
                        {I18nUtils.t('search')}
                      </Button>
                      <Button color="danger" onClick={this.handleResetForm}>
                        {I18nUtils.t('reset')}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
        {
          !collapse &&
          <span className="lb-showhide text-success active">
            {I18nUtils.t('lb-showhide')}
          </span>
        }
      </div>
    )
  }
}

SearchCondition.propTypes = {
  history: PropTypes.object,
  hasFreeword: PropTypes.object,
  hasGroup: PropTypes.bool,
  hasStore: PropTypes.bool
}

export default connect()(withRouter(SearchCondition))
