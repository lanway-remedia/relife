import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StoreListModal from '../components/StoreListModal'
import Select from 'react-select'
// import AttributesComponent from './AttributesComponent'
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
  Collapse,
  CardBody,
  Card
} from 'reactstrap'

const TIMEOUT = 0

const initialState = {
  freeword: '',
  group: 0,
  status: {},
  store: {},
  contruction: {},
  floor: {},
  price: {},
  style: {},
  houseincome: {},
  housesize: {},
  showStoreList: false
}

class SearchCondition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
      dataStatus: [
        {
          value: 2,
          label: I18nUtils.t('lb-select-vl')
        },
        {
          value: 1,
          label: I18nUtils.t('lb-enable')
        },
        {
          value: 0,
          label: I18nUtils.t('lb-disabled')
        }
      ],
      collapse: true,
      timeout: TIMEOUT
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    let paramStatus = params.get('status_flag')
    let statusVal = 0
    if (paramStatus === 'true') {
      statusVal = 1
    } else {
      statusVal = 0
    }
    let status = this.state.dataStatus.find(item => item.value === statusVal)

    this.setState({
      freeword: params.get('freeword') || '',
      group: params.get('group') || 0,
      status: status || this.state.dataStatus[0],
      store: params.get('store')
        ? { value: params.get('store'), title: params.get('store_title') }
        : {},
      collapse: !!(
        params.get('freeword') ||
        params.get('group') ||
        params.get('status_flag') ||
        params.get('store')
      ),
      timeout:
        params.get('freeword') ||
        params.get('group') ||
        params.get('status_flag') ||
        params.get('store')
          ? 0
          : TIMEOUT
    })
  }

  onclickSubmit = () => {
    let { freeword, group, status, store } = this.state
    let parsed = {
      ...(freeword && { freeword: freeword }),
      ...(group && group != 0 && { group: group }),
      ...(status &&
        status.value != 2 &&
        status.value != null && {
          status_flag: status.value === 0 ? false : true
        }),
      ...(store.id && { store: store.id }),
      ...(store.title && { store_title: store.title })
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}`
    })
  }

  handleResetForm = () => {
    this.setState(initialState)
  }

  handleChange = (e, name) => {
    if (e.target) {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        [name]: e
      })
    }
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
    this.setState(
      {
        timeout: TIMEOUT
      },
      () => {
        this.setState({ collapse: !this.state.collapse })
      }
    )
  }

  // selectOption = selectedOption => {
  //   console.log(selectedOption)
  // }

  render() {
    let { hasFreeword, hasGroup, hasStore, hasStatus } = this.props
    let {
      showStoreList,
      collapse,
      freeword,
      group,
      store,
      timeout,
      status,
      dataStatus
    } = this.state

    return (
      <div className="filter-group">
        <div className="filter-title">
          <h4 onClick={this.handleShowHideForm}>
            {I18nUtils.t('lb-ad-search')}
          </h4>
        </div>
        <div className="filter-body">
          <Collapse isOpen={collapse} timeout={timeout}>
            <Card>
              <CardBody>
                <StoreListModal
                  isOpen={showStoreList}
                  toggle={isOpen => this.toggleHandle(isOpen)}
                  selectStore={selectedStore => this.selectStore(selectedStore)}
                />
                <Form onSubmit={this.handleSubmit} ref={f => (this.form = f)}>
                  <Row>
                    {hasFreeword && (
                      <Col xs="12" md="4">
                        <FormGroup>
                          <Label for="freeword">{hasFreeword.title}</Label>
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
                    )}
                    {hasGroup && (
                      <Col xs="12" md="4">
                        <FormGroup>
                          <Label for="group">
                            {I18nUtils.t('group-selection')}
                          </Label>
                          <Input
                            type="select"
                            name="group"
                            id="group"
                            onChange={this.handleChange}
                            value={group}
                          >
                            <option value={0}>---</option>
                            <option value={4}>{I18nUtils.t('group-4')}</option>
                            <option value={3}>{I18nUtils.t('group-3')}</option>
                            <option value={2}>{I18nUtils.t('group-2')}</option>
                            <option value={1}>{I18nUtils.t('group-1')}</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    )}
                    {hasStore && (
                      <Col xs="12" md="4">
                        <FormGroup>
                          <Label for="store">
                            {I18nUtils.t('store-selection')}
                          </Label>
                          <InputGroup>
                            <Input
                              type="text"
                              name="store"
                              id="store"
                              value={store.title || ''}
                              disabled
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                type="button"
                                color="secondary"
                                onClick={this.showStoreListHandle}
                              >
                                {I18nUtils.t('store-selection')}
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    )}
                    {hasStatus && (
                      <Col xs="12" md="4">
                        <FormGroup className="react-select">
                          <Label for="status">{I18nUtils.t('status')}</Label>
                          <Select
                            className="react-select-ops"
                            classNamePrefix="rs-cus"
                            isClearable={false}
                            isSearchable={false}
                            id="status"
                            defaultValue={dataStatus[0]}
                            value={status || dataStatus[0]}
                            options={dataStatus}
                            placeholder={I18nUtils.t('lb-select-vl')}
                            onChange={e => this.handleChange(e, 'status')}
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {/* {hasAttribute && (
                      <AttributesComponent
                        selectOption={selectedOption =>
                          this.selectOption(selectedOption)
                        }
                      />
                    )} */}
                    <Col xs="12" md="12">
                      <div className="btns-group text-center mt-2">
                        <Button
                          color="secondary"
                          onClick={this.handleResetForm}
                        >
                          {I18nUtils.t('reset')}
                        </Button>
                        <Button color="success" onClick={this.onclickSubmit}>
                          {I18nUtils.t('search')}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Collapse>
          {!collapse && (
            <span className="lb-showhide text-success active">
              {I18nUtils.t('lb-showhide')}
            </span>
          )}
        </div>
      </div>
    )
  }
}

SearchCondition.propTypes = {
  history: PropTypes.object,
  hasFreeword: PropTypes.object,
  hasGroup: PropTypes.bool,
  hasStore: PropTypes.bool,
  hasStatus: PropTypes.bool,
  hasAttribute: PropTypes.bool
}

export default connect()(withRouter(SearchCondition))
