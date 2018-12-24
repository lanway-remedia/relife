/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import ExampleHouseActions from '../../redux/wrapper/ExampleHousesRedux'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import StoreListModal from '../../components/StoreListModal'

import ImageUploadComponent from './../../components/ImageUploadComponent'

import { ModalName } from '../../constants'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

// Import react select
import Select from 'react-select'

const initialState = {
  thumbnailImage: null,
  data: [],
  dataCons: [],
  dataFloor: [],
  dataPrice: [],
  dataStyle: [],
  dataHouseIncome: [],
  dataHouseSize: [],
  showStoreList: false,
  store: {},
  title: '',
  status: '',
  content: '',
  contruction: '',
  price: '',
  housestyle: [],
  floor: '',
  houseincome: '',
  housesize: ''
}

class AddNewExampleHousePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.redirectToListPage = this.redirectToListPage.bind(this)

    this.getContructionList = this.getContructionList.bind(this)
    this.getFloorList = this.getFloorList.bind(this)
    this.getPriceList = this.getPriceList.bind(this)
    this.getStyleList = this.getStyleList.bind(this)
    this.getHouseIncomeList = this.getHouseIncomeList.bind(this)
    this.getHouseSizeList = this.getHouseSizeList.bind(this)
  }

  getContructionList() {
    this.props.attributeContructionListRequest({})
  }

  getFloorList() {
    this.props.attributeFloorListRequest({})
  }

  getPriceList() {
    this.props.attributePriceListRequest({})
  }

  getStyleList() {
    this.props.attributeStyleListRequest({})
  }

  getHouseIncomeList() {
    this.props.attributeHouseIncomeListRequest({})
  }

  getHouseSizeList() {
    this.props.attributeHouseSizeListRequest({})
  }

  componentDidMount() {
    this.getContructionList()
    this.getFloorList()
    this.getPriceList()
    this.getStyleList()
    this.getHouseIncomeList()
    this.getHouseSizeList()
  }

  handleChange = e => {
    const target = e.target
    const name = target.name
    const value =
      target.type === 'select-multiple'
        ? Array.from(target.selectedOptions, option => option.value)
        : target.value
    this.setState({
      [name]: value
    })
  }

  handleModelChange = content => {
    this.setState({
      content: content
    })
  }

  handleImageChange = image => {
    this.setState({
      thumbnailImage: image
    })
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-example-house-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataAttributes !== nextProps.dataAttributes) {
      let response = nextProps.dataAttributes
      if (response.isGetListContruction) {
        this.setState({
          dataCons: response.data
        })
      }
      if (response.isGetListFloor) {
        this.setState({
          dataFloor: response.data
        })
      }
      if (response.isGetListPrice) {
        this.setState({
          dataPrice: response.data
        })
      }
      if (response.isGetListStyle) {
        this.setState({
          dataStyle: response.data
        })
      }
      if (response.isGetListHI) {
        this.setState({
          dataHouseIncome: response.data
        })
      }
      if (response.isGetListHS) {
        this.setState({
          dataHouseSize: response.data
        })
      }
    }
    if (this.props.dataExample !== nextProps.dataExample) {
      let data = nextProps.dataExample
      if (data.isAddHouse) {
        // this.setState(initialState)
        this.props.show(ModalName.COMMON, {
          message: (
            <span className="text-success">
              {I18nUtils.t('modal-add-success')}
            </span>
          )
        })
        this.props.history.push('/manage-example-house-list')
      }
    }

    return null
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

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.thumbnailImage === null) {
      this.props.show(ModalName.COMMON, {
        message: (
          <span className="text-danger">{I18nUtils.t('modal-img-error')}</span>
        )
      })
    } else {
      let data = new FormData()
      data.append('title', this.state.title)
      data.append('content', this.state.content)
      data.append('status_flag', this.state.status)
      data.append('store', this.state.store.id)
      data.append('contruction', this.state.contruction)
      data.append('price_range', this.state.price)
      if (this.state.housestyle.length)
        for (let i = 0; i < this.state.housestyle.length; i++) {
          data.append('styles', this.state.housestyle[i])
        }
      data.append('floor', this.state.floor)
      data.append('household_income', this.state.houseincome)
      data.append('household_size', this.state.housesize)
      data.append('img_large', this.state.thumbnailImage)
      data.append('is_active', 1)
      this.props.exampleHouseAddRequest(data)
    }
  }

  render() {
    let {
      thumbnailImage,
      showStoreList,
      dataCons,
      dataFloor,
      dataHouseIncome,
      dataHouseSize,
      dataPrice,
      dataStyle,
      store,
      title,
      status,
      content,
      contruction,
      price,
      housestyle,
      floor,
      houseincome,
      housesize
    } = this.state

    console.log(dataStyle)
    return (
      <Container fluid className="add-new-examplehouse">
        <Helmet>
          <title>{I18nUtils.t('expl-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>{I18nUtils.t('expl-add-page-title')}</h1>
        </div>
        <div className="box-group">
          <div className="box-content">
            <StoreListModal
              isOpen={showStoreList}
              toggle={isOpen => this.toggleHandle(isOpen)}
              selectStore={selectedStore => this.selectStore(selectedStore)}
            />
            <ValidationForm
              className="form-add-examplehouse col-no-mg"
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col xs="12" md="12">
                  <div className="btns-group text-center mb-4">
                    <Button color="success">
                      {I18nUtils.t('btn-add-new')}
                    </Button>
                    <Button
                      title={I18nUtils.t('expl-title-back-list')}
                      onClick={this.redirectToListPage}
                      color="danger"
                    >
                      {I18nUtils.t('btn-back')}
                    </Button>
                  </div>
                </Col>
                <Col xs="12" md="12">
                  <ImageUploadComponent
                    imageUpload={thumbnailImage}
                    uploadTitle={I18nUtils.formatMessage(
                      { id: 'sub-title-img' },
                      { type: 'thumbnail', name: 'Example House' }
                    )}
                    width={120}
                    height={120}
                    onImageChange={image => this.handleImageChange(image)}
                  />
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label htmlFor="title">{I18nUtils.t('title')}</Label>
                    <TextInput
                      type="text"
                      name="title"
                      id="title"
                      placeholder={I18nUtils.t('all-place-input')}
                      value={title}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="status">{I18nUtils.t('status')}</Label>
                    <SelectGroup
                      type="select"
                      name="status"
                      id="status"
                      onChange={this.handleChange}
                      value={status}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      <option value="1">{I18nUtils.t('lb-enable')}</option>
                      <option value="0">{I18nUtils.t('lb-disabled')}</option>
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="store">{I18nUtils.t('store-selection')}</Label>
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
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="contruction">
                      {I18nUtils.t('contruction')}
                    </Label>
                    <SelectGroup
                      type="select"
                      name="contruction"
                      id="contruction"
                      onChange={this.handleChange}
                      value={contruction}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      {dataCons.length > 0 &&
                        dataCons.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="floor">{I18nUtils.t('floor')}</Label>
                    <SelectGroup
                      type="select"
                      name="floor"
                      id="floor"
                      onChange={this.handleChange}
                      value={floor}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      {dataFloor.length > 0 &&
                        dataFloor.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="floor">{I18nUtils.t('price')}</Label>
                    <SelectGroup
                      type="select"
                      name="price"
                      id="price"
                      value={price}
                      onChange={this.handleChange}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      {dataPrice.length > 0 &&
                        dataPrice.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="houseincome">
                      {I18nUtils.t('houseincome')}
                    </Label>
                    <SelectGroup
                      type="select"
                      name="houseincome"
                      id="houseincome"
                      onChange={this.handleChange}
                      value={houseincome}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      {dataHouseIncome.length > 0 &&
                        dataHouseIncome.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="housesize">{I18nUtils.t('housesize')}</Label>
                    <SelectGroup
                      type="select"
                      name="housesize"
                      id="housesize"
                      value={housesize}
                      onChange={this.handleChange}
                      required
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      <option value="">{I18nUtils.t('lb-select')}</option>
                      {dataHouseSize.length > 0 &&
                        dataHouseSize.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="housestyle">{I18nUtils.t('housestyle')}</Label>
                    <SelectGroup
                      type="select"
                      name="housestyle"
                      id="housestyle"
                      value={housestyle}
                      onChange={this.handleChange}
                      required
                      multiple
                      errorMessage={I18nUtils.t('lb-select')}
                    >
                      {dataStyle.length > 0 &&
                        dataStyle.map((att, key) => {
                          return (
                            <option key={key} value={att.id}>
                              {att.title}
                            </option>
                          )
                        })}
                    </SelectGroup>
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="housestyle">{I18nUtils.t('housestyle')}</Label>
                    <Select
                      className="react-select-ops"
                      isMulti
                      options={dataStyle}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Label htmlFor="content">{I18nUtils.t('content')}</Label>
                    <FroalaEditor
                      tag="textarea"
                      // config={this.config}
                      model={content}
                      onModelChange={this.handleModelChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                  <div className="btns-group text-center">
                    <Button color="success">
                      {I18nUtils.t('btn-page-review')}
                    </Button>
                    <Button color="success">
                      {I18nUtils.t('btn-add-new')}
                    </Button>
                    <Button
                      title={I18nUtils.t('expl-title-back-list')}
                      onClick={this.redirectToListPage}
                      color="danger"
                    >
                      {I18nUtils.t('btn-back')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </ValidationForm>
          </div>
        </div>
      </Container>
    )
  }
}

AddNewExampleHousePage.propTypes = {
  history: PropTypes.object,
  exampleHouseAddRequest: PropTypes.func,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributePriceListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  dataExample: PropTypes.object,
  dataAttributes: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.exampleHouses.processing,
    dataExample: state.exampleHouses.data,
    dataAttributes: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  exampleHouseAddRequest: data =>
    dispatch(ExampleHouseActions.exampleHouseAddRequest(data)),
  attributeContructionListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeContructionListRequest(dataAttributes)),
  attributeFloorListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeFloorListRequest(dataAttributes)),
  attributeStyleListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeStyleListRequest(dataAttributes)),
  attributeHouseIncomeListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeHouseIncomeListRequest(dataAttributes)),
  attributeHouseSizeListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeHouseSizeListRequest(dataAttributes)),
  attributePriceListRequest: dataAttributes =>
    dispatch(AttributeActions.attributePriceListRequest(dataAttributes))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewExampleHousePage))
