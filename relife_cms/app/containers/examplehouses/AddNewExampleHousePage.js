/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
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
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import ExampleHouseActions from '../../redux/wrapper/ExampleHousesRedux'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import TagActions from '../../redux/wrapper/TagsRedux'
import StoreListModal from '../../components/StoreListModal'

import ImageUploadComponent from './../../components/ImageUploadComponent'

import { ModalName } from '../../constants'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'

import { WithContext as ReactTags } from 'react-tag-input'

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
  suggestions: [],
  store: {},
  tags: [],
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

const KeyCodes = {
  comma: 188,
  enter: 13
}
const delimiters = [KeyCodes.comma, KeyCodes.enter]

class AddNewExampleHousePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
      statusOptions: [
        {
          id: '1',
          title: I18nUtils.t('lb-enable')
        },
        {
          id: '0',
          title: I18nUtils.t('lb-disabled')
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.redirectToListPage = this.redirectToListPage.bind(this)

    this.getContructionList = this.getContructionList.bind(this)
    this.getFloorList = this.getFloorList.bind(this)
    this.getPriceList = this.getPriceList.bind(this)
    this.getStyleList = this.getStyleList.bind(this)
    this.getHouseIncomeList = this.getHouseIncomeList.bind(this)
    this.getHouseSizeList = this.getHouseSizeList.bind(this)
    this.getTagList = this.getTagList.bind(this)
    this.handleDeleteTag = this.handleDeleteTag.bind(this)
    this.handleAdditionTag = this.handleAdditionTag.bind(this)
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

  getTagList() {
    this.props.tagListRequest()
  }

  componentDidMount() {
    this.getContructionList()
    this.getFloorList()
    this.getPriceList()
    this.getStyleList()
    this.getHouseIncomeList()
    this.getHouseSizeList()
    this.getTagList()
  }

  handleChange = (e, name) => {
    if (e.target) {
      const target = e.target
      const name = target.name
      const value =
        target.type === 'select-multiple'
          ? Array.from(target.selectedOptions, option => option.value)
          : target.value
      this.setState({
        [name]: value
      })
    } else {
      this.setState({
        [name]: e
      })
    }
  }

  handleMultiChange = selectedOption => {
    this.setState({ housestyle: selectedOption })
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
    if (this.props.dataTags !== nextProps.dataTags) {
      let response = nextProps.dataTags
      if (response.isGetTagList) {
        let data = response.data
        let tags = []
        data.map(function(e) {
          let obj = {}
          obj['id'] = e['id'].toString()
          obj['name'] = e['name']
          return tags.push(obj)
        })
        this.setState({
          suggestions: tags
        })
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
      data.append('status_flag', this.state.status.id)
      data.append('store', this.state.store.id)
      data.append('contruction', this.state.contruction.id)
      data.append('price_range', this.state.price.id)
      if (this.state.housestyle.length)
        for (let i = 0; i < this.state.housestyle.length; i++) {
          data.append('styles', this.state.housestyle[i].id)
        }
      if (this.state.tags.length > 0) {
        for (let i = 0; i < this.state.tags.length; i++) {
          data.append('tags', this.state.tags[i].name)
        }
      }

      data.append('floor', this.state.floor.id)
      data.append('household_income', this.state.houseincome.id)
      data.append('household_size', this.state.housesize.id)
      data.append('img_large', this.state.thumbnailImage)
      data.append('is_active', 1)
      this.props.exampleHouseAddRequest(data)
    }
  }

  previewPage = data => {
    return (
      <div className="preview-content">
        {data.title && <h1 className="preview-title">{data.title}</h1>}
        {data.store && <div className="store-title">{data.store}</div>}
        {data.imgThumb && (
          <div className="detail-img">
            <img alt={data.title} src={data.imgThumb} />
          </div>
        )}
        {data.tags.length > 0 && (
          <div className="detail-tags">
            <ul className="list-tags">
              {data.tags.map(tag => (
                <li key={tag.id}>
                  <Link
                    to="/"
                    onClick={e => {
                      e.preventDefault()
                    }}
                    title={tag.name}
                  >
                    # {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className="detail-content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    )
  }

  handlePreview = e => {
    e.preventDefault()
    const data = {
      imgThumb: this.state.thumbnailImage
        ? URL.createObjectURL(this.state.thumbnailImage)
        : null,
      title: this.state.title,
      content: this.state.content,
      store: this.state.store.title,
      contruction: this.state.contruction,
      price_range: this.state.price_range,
      floor: this.state.floor,
      household_income: this.state.household_income,
      household_size: this.state.household_size,
      tags: this.state.tags
    }

    if (
      !data.imgThumb &&
      !data.title &&
      !data.content &&
      !data.store &&
      !data.contruction &&
      !data.price_range &&
      !data.floor &&
      !data.household_income &&
      !data.household_size &&
      data.tags.length > 0
    )
      this.props.show(ModalName.COMMON, {
        modalClass: 'preview-modal',
        message: (
          <span className="text-danger">{I18nUtils.t('modal-prev-data')}</span>
        )
      })
    else
      this.props.show(ModalName.COMMON, {
        modalClass: 'preview-modal',
        message: this.previewPage(data)
      })
  }

  handleDeleteTag(i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAdditionTag(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }))
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
      statusOptions,
      content,
      contruction,
      price,
      housestyle,
      floor,
      houseincome,
      housesize,
      tags,
      suggestions
    } = this.state

    const config = {
      imageUploadURL:
        'https://d2t3gximuwdg8x.cloudfront.net/api/file-managements/v1/upload/',
      imageUploadMethod: 'POST',
      events: {
        'froalaEditor.image.uploaded': (e, editor, response) => {
          response = JSON.parse(response)
          editor.image.insert(
            response.data.url,
            true,
            null,
            editor.image.get(),
            null
          )
          return false
        }
      }
    }

    const classTag = {
      tagInputField: 'form-control'
    }

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
                    <Button color="warning" onClick={this.handlePreview}>
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
                  <FormGroup className="react-select">
                    <Label for="status">{I18nUtils.t('status')}</Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="status"
                      value={status}
                      options={statusOptions}
                      onChange={e => this.handleChange(e, 'status')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
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
                  <FormGroup className="react-select">
                    <Label for="contruction">
                      {I18nUtils.t('contruction')}
                    </Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="contruction"
                      value={contruction}
                      options={dataCons}
                      onChange={e => this.handleChange(e, 'contruction')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="floor">{I18nUtils.t('floor')}</Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="floor"
                      value={floor}
                      options={dataFloor}
                      onChange={e => this.handleChange(e, 'floor')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="floor">{I18nUtils.t('price')}</Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="price"
                      value={price}
                      options={dataPrice}
                      onChange={e => this.handleChange(e, 'price')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="houseincome">
                      {I18nUtils.t('houseincome')}
                    </Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="houseincome"
                      value={houseincome}
                      options={dataHouseIncome}
                      onChange={e => this.handleChange(e, 'houseincome')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="housesize">{I18nUtils.t('housesize')}</Label>
                    <Select
                      className="react-select-ops"
                      classNamePrefix="rs-cus"
                      isClearable={false}
                      isSearchable={false}
                      id="housesize"
                      value={housesize}
                      options={dataHouseSize}
                      onChange={e => this.handleChange(e, 'housesize')}
                      getOptionLabel={({ title }) => title}
                      getOptionValue={({ id }) => id}
                      placeholder={I18nUtils.t('lb-select-vl')}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup className="react-select">
                    <Label for="housestyle">{I18nUtils.t('housestyle')}</Label>
                    <Select
                      className="react-select-ops"
                      name="housestyle"
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
                    <Label for="tag">{I18nUtils.t('tag')}</Label>
                    <ReactTags
                      name="tag"
                      tags={tags}
                      labelField={'name'}
                      id="tag"
                      placeholder={I18nUtils.t('tag-add-page-title')}
                      inline={false}
                      classNames={classTag}
                      suggestions={suggestions}
                      handleDelete={this.handleDeleteTag}
                      handleAddition={this.handleAdditionTag}
                      delimiters={delimiters}
                      allowDragDrop={false}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12">
                  <FormGroup>
                    <Label htmlFor="content">{I18nUtils.t('content')}</Label>
                    <FroalaEditor
                      tag="textarea"
                      config={config}
                      model={content}
                      onModelChange={this.handleModelChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12" className="mt-3">
                  <div className="btns-group text-center">
                    <Button color="warning" onClick={this.handlePreview}>
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
  tagListRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  dataExample: PropTypes.object,
  dataAttributes: PropTypes.object,
  dataTags: PropTypes.object,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.exampleHouses.processing,
    dataExample: state.exampleHouses.data,
    dataAttributes: state.attributes.data,
    dataTags: state.tags.data
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
    dispatch(AttributeActions.attributePriceListRequest(dataAttributes)),
  tagListRequest: dataTags => dispatch(TagActions.tagListRequest(dataTags))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewExampleHousePage))
