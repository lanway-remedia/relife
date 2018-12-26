/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExampleHouseActions from '../../redux/wrapper/ExampleHousesRedux'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import ImageUploadComponent from './../../components/ImageUploadComponent'
import I18nUtils from '../../utils/I18nUtils'
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
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import { bindActionCreators } from 'redux'
import StoreListModal from '../../components/StoreListModal'
import Select from 'react-select'
import _ from 'lodash'
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import FroalaEditor from 'react-froala-wysiwyg'

class EditExampleHousePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      id: '',
      title: '',
      status: '',
      content: '',
      contruction: '',
      price: '',
      housestyle: [],
      oldHouseStyle: [],
      floor: '',
      houseincome: '',
      housesize: '',
      storeId: '',
      storeName: ''
    }
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getDetailExample = this.getDetailExample.bind(this)
    this.getContructionList = this.getContructionList.bind(this)
    this.getFloorList = this.getFloorList.bind(this)
    this.getPriceList = this.getPriceList.bind(this)
    this.getStyleList = this.getStyleList.bind(this)
    this.getHouseIncomeList = this.getHouseIncomeList.bind(this)
    this.getHouseSizeList = this.getHouseSizeList.bind(this)
  }

  getDetailExample() {
    const id = this.props.match.params.id
    this.props.exampleHouseGetRequest(id)
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
    this.getDetailExample()
    this.getContructionList()
    this.getFloorList()
    this.getPriceList()
    this.getStyleList()
    this.getHouseIncomeList()
    this.getHouseSizeList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataExample !== nextProps.dataExample) {
      let response = nextProps.dataExample
      if (response.data === undefined || response.data.length === 0) {
        this.props.show(ModalName.COMMON, {
          message: I18nUtils.t('toast-no-data')
        })
        this.props.history.replace('/manage-example-house-list')
      } else {
        if (response.data.store) {
          this.props.outletStoreGetRequest(response.data.store.id)
        }

        this.setState(
          {
            data: response.data,
            id: this.props.match.params.id,
            title: response.data.title,
            status: response.data.status_flag === false ? '0' : '1',
            content: response.data.content,
            contruction: response.data.contruction,
            price: response.data.price_range,
            housestyle: response.data.styles,
            floor: response.data.floor,
            houseincome: response.data.household_income,
            housesize: response.data.household_size,
            thumbnailImage: response.data.img_large
          },
          () => {
            const newHouseStyles = []
            if (this.state.housestyle)
              for (let i = 0; i < this.state.housestyle.length; i++) {
                let obj = {}
                obj['id'] = this.state.housestyle[i].style.id
                obj['title'] = this.state.housestyle[i].style.title
                obj['order'] = this.state.housestyle[i].style.order
                newHouseStyles.push(obj)
                this.setState({
                  housestyle: newHouseStyles,
                  oldHouseStyle: newHouseStyles
                })
              }
          }
        )
      }

      if (response.messageCode === 'EX203' && response.isEditHouse) {
        this.props.show(ModalName.COMMON, {
          message: <span className="text-success">{I18nUtils.t('EX203')}</span>
        })
      }
    }

    if (this.props.dataStore !== nextProps.dataStore) {
      let response = nextProps.dataStore
      this.setState({
        storeId: response.data.id,
        storeName: response.data.title,
        store: response.data
      })
    }

    if (this.props.dataAttributes !== nextProps.dataAttributes) {
      let resAtt = nextProps.dataAttributes
      if (resAtt.data !== undefined || resAtt.data.length !== 0) {
        if (resAtt.isGetListContruction) {
          this.setState({
            dataCons: resAtt.data
          })
        }
        if (resAtt.isGetListFloor) {
          this.setState({
            dataFloor: resAtt.data
          })
        }
        if (resAtt.isGetListPrice) {
          this.setState({
            dataPrice: resAtt.data
          })
        }
        if (resAtt.isGetListStyle) {
          this.setState({
            dataStyle: resAtt.data
          })
        }
        if (resAtt.isGetListHI) {
          this.setState({
            dataHouseIncome: resAtt.data
          })
        }
        if (resAtt.isGetListHS) {
          this.setState({
            dataHouseSize: resAtt.data
          })
        }
      }
    }

    return null
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-example-house-list')
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

  handleMultiChange = selectedOption => {
    this.setState({ housestyle: selectedOption })
  }

  handleImageChange = image => {
    this.setState({
      thumbnailImage: image
    })
  }

  handleDelete = id => {
    this.props.show(ModalName.COMMON, {
      title: I18nUtils.t('modal-del-header'),
      message: I18nUtils.t('modal-del-body'),
      deleteFunction: () => this.deleteFunction(id)
    })
  }

  deleteFunction = id => {
    this.props.exampleHouseDeleteRequest(id)
    this.props.show(ModalName.COMMON, {
      title: I18nUtils.t('modal-del-header'),
      message: (
        <span className="text-success">{I18nUtils.t('modal-del-success')}</span>
      )
    })
    this.props.history.push('/manage-outlet-store-list')
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
    let diff = _.differenceBy(
      this.state.oldHouseStyle,
      this.state.housestyle,
      'id'
    )

    let data = new FormData()
    data.append('id', this.state.id)
    data.append('title', this.state.title)
    data.append('content', this.state.content)
    data.append('status_flag', this.state.status)
    if (this.state.store.id !== this.state.storeId) {
      data.append('store', this.state.store.id)
    } else {
      data.append('store', this.state.storeId)
    }

    data.append('contruction', this.state.contruction)

    data.append('price_range', this.state.price)

    if (this.state.housestyle)
      for (let i = 0; i < this.state.housestyle.length; i++) {
        data.append('styles', this.state.housestyle[i].id)
      }
    if (diff.length > 0)
      for (let i = 0; i < diff.length; i++) {
        data.append('remove_styles', diff[i].id)
      }

    data.append('floor', this.state.floor)
    data.append('household_income', this.state.houseincome)
    data.append('household_size', this.state.housesize)
    data.append('is_active', 1)

    if (typeof this.state.thumbnailImage !== 'string') {
      data.append('img_large', this.state.thumbnailImage)
    } else if (this.state.thumbnailImage === null) {
      this.props.show(ModalName.COMMON, {
        message: (
          <span className="text-danger">{I18nUtils.t('modal-img-error')}</span>
        )
      })
    }

    this.props.exampleHouseEditRequest(data)
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

    return (
      <Container fluid className="edit-examplehouse">
        <Helmet>
          <title>
            {I18nUtils.formatMessage(
              { id: 'expl-ed-page-title' },
              { name: title }
            )}
          </title>
        </Helmet>
        <div className="page-title">
          <h1>
            {I18nUtils.formatMessage(
              { id: 'expl-ed-page-title' },
              { name: title }
            )}
          </h1>
        </div>

        <div className="box-group">
          <div className="box-content">
            <StoreListModal
              isOpen={showStoreList}
              toggle={isOpen => this.toggleHandle(isOpen)}
              selectStore={selectedStore => this.selectStore(selectedStore)}
            />
            <ValidationForm
              className="form-edit-examplehouse col-no-mg"
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col xs="12" md="12">
                  <div className="btns-group text-center mb-4">
                    <Button
                      onClick={() => this.handleDelete(this.state.id)}
                      color="secondary"
                    >
                      {I18nUtils.t('delete')}
                    </Button>
                    <Button color="success">{I18nUtils.t('btn-save')}</Button>
                    <Button
                      title={I18nUtils.t('ots-title-back-list')}
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
                    width={400}
                    height={250}
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
                  <FormGroup className="react-select">
                    <Label for="housestyle">{I18nUtils.t('housestyle')}</Label>
                    <Select
                      className="react-select-ops"
                      isMulti
                      options={dataStyle}
                      value={housestyle}
                      classNamePrefix="rs-cus"
                      onChange={this.handleMultiChange}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Label htmlFor="content">{I18nUtils.t('content')}</Label>
                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      model={content}
                      onModelChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                  <div className="btns-group text-center">
                    <Button
                      onClick={() => this.handleDelete(this.state.id)}
                      color="secondary"
                    >
                      {I18nUtils.t('delete')}
                    </Button>
                    <Button color="success">{I18nUtils.t('btn-save')}</Button>
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

EditExampleHousePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  exampleHouseGetRequest: PropTypes.func,
  exampleHouseEditRequest: PropTypes.func,
  exampleHouseDeleteRequest: PropTypes.func,
  outletStoreGetRequest: PropTypes.func,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  attributePriceListRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  dataExample: PropTypes.object,
  dataStore: PropTypes.object,
  dataAttributes: PropTypes.object,
  response: PropTypes.object,
  messageCode: PropTypes.string
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    dataExample: state.exampleHouses.data,
    dataStore: state.outletStores.data,
    dataAttributes: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  exampleHouseGetRequest: dataExample =>
    dispatch(ExampleHouseActions.exampleHouseGetRequest(dataExample)),
  exampleHouseEditRequest: dataExample =>
    dispatch(ExampleHouseActions.exampleHouseEditRequest(dataExample)),
  exampleHouseDeleteRequest: dataExample =>
    dispatch(ExampleHouseActions.exampleHouseDeleteRequest(dataExample)),
  outletStoreGetRequest: dataStore =>
    dispatch(OutletStoreActions.outletStoreGetRequest(dataStore)),
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
)(withRouter(EditExampleHousePage))
