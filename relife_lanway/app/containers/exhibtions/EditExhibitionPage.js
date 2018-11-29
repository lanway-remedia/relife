/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ExhibitionActions from '../../redux/wrapper/ExhibitionsRedux'
import ImageUploadComponent from './../../components/ImageUploadComponent'
import I18nUtils from '../../utils/I18nUtils'
import {
  Container,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import LocationsComponent from '../../components/LocationsComponent'

class EditExhibitionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      thumbnailImage: null,
      id: '',
      title: '',
      address: '',
      zipcode: '',
      startTime: '',
      endTime: '',
      content: '',
      city: '',
      district: ''
    }
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
    this.handleSelectedCity = this.handleSelectedCity.bind(this)
    this.handleSelectedDistrict = this.handleSelectedDistrict.bind(this)
  }

  handleChangeFromDate(date) {
    this.setState({
      fromDate: date
    })
  }

  handleChangeToDate(date) {
    this.setState({
      toDate: date
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.exhibitionGetRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.data === undefined || response.data.length === 0) {
        if (response.errors) {
          toast.error(response.errors.non_field_errors)
        } else {
          toast.error(I18nUtils.t('toast-no-data'))
          this.props.history.replace('/manage-exhibition-list')
        }
      } else {
        this.setState({
          data: response.data,
          id: response.data.id,
          title: response.data.title,
          address: response.data.address,
          city: response.data.district.city.id,
          district: response.data.district.id,
          zipcode: response.data.zipcode,
          startTime: response.data.start_time,
          endTime: response.data.end_time,
          content: response.data.content,
          thumbnailImage: response.data.img_large
        })
      }
    }
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-exhibition-list')
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleImageChange = image => {
    this.setState({
      thumbnailImage: image
    })
  }

  handleSelectedCity = cityId => {
    this.setState({
      city: cityId
    })
  }

  handleSelectedDistrict = districtId => {
    this.setState({
      district: districtId
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('id', this.state.id)
    data.append('num_attend', 111111)
    data.append('latitude', 111111)
    data.append('longtitude', 222222)
    data.append('title', this.state.title)
    data.append('address', this.state.address)
    data.append('zipcode', this.state.zipcode)
    data.append('start_time', moment(this.state.fromDate).format('YYYY/MM/DD'))
    data.append('end_time', moment(this.state.toDate).format('YYYY/MM/DD'))
    data.append('content', this.state.content)
    data.append('district_id', this.state.district)
    data.append('city', this.state.city)

    if (typeof this.state.thumbnailImage !== 'string') {
      data.append('img_large', this.state.thumbnailImage)
    }
    this.props.exhibitionEditRequest(data)
    if (this.props.processing) {
      toast.success(
        I18nUtils.formatMessage(
          { id: 'toast-edit-sucess' },
          { name: this.state.title }
        )
      )
    }
  }

  render() {
    let { thumbnailImage, data } = this.state
    return (
      <Container fluid className="edit-outletstore">
        <Helmet>
          <title>
            {I18nUtils.formatMessage(
              { id: 'ots-ed-page-title' },
              { name: data.title }
            )}
          </title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.formatMessage(
              { id: 'ots-ed-page-title' },
              { name: data.title }
            )}
          </h1>
        </div>

        <ValidationForm
          className="form-edit-outletstore col-no-mg"
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col xs="12" md="12">
              <ImageUploadComponent
                imageUpload={thumbnailImage}
                uploadTitle={I18nUtils.formatMessage(
                  { id: 'sub-title-img' },
                  { type: 'thumbnail', name: 'Outlet Store' }
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
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="address">{I18nUtils.t('address')}</Label>
                <TextInput
                  type="text"
                  name="address"
                  id="address"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.address}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <LocationsComponent
              required
              onSelectedCity={this.handleSelectedCity}
              onSelectedDistrict={this.handleSelectedDistrict}
              city={`${this.state.city}`}
              district={`${this.state.district}`}
            />
            {/* <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="district">{I18nUtils.t('district')}</Label>
                <SelectGroup
                  name="district"
                  id="district"
                  required
                  errorMessage={I18nUtils.t('lb-select')}
                  onChange={this.handleChange}
                  value={
                    this.state.district === null ? ' ' : this.state.district
                  }
                >
                  <option value="">{I18nUtils.t('lb-select')}</option>
                  <option value="1">Hoàng Mai</option>
                  <option value="2">Hai Bà Trưng</option>
                </SelectGroup>
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="city">{I18nUtils.t('city')}</Label>
                <SelectGroup
                  name="city"
                  id="city"
                  required
                  errorMessage={I18nUtils.t('lb-select')}
                  onChange={this.handleChange}
                  value={this.state.city === null ? ' ' : this.state.city}
                >
                  <option value="">{I18nUtils.t('lb-select')}</option>
                  <option value="1">Hoàng Mai</option>
                  <option value="2">Hai Bà Trưng</option>
                </SelectGroup>
              </FormGroup>
            </Col> */}
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="zipcode">{I18nUtils.t('zipcode')}</Label>
                <TextInput
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.zipcode}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label>{I18nUtils.t('start-date')}</Label>
                <InputGroup className="form-datepicker">
                  <DatePicker
                    className="form-control"
                    selected={this.state.fromDate}
                    onChange={this.handleChangeFromDate}
                    dateFormat="YYYY/MM/DD"
                    locale="en-us"
                    placeholderText="yyyy/mm/dd"
                    name="fromDate"
                    autocompete="off"
                    value={this.state.startTime}
                  />
                  <InputGroupAddon
                    addonType="prepend"
                    className="input-group-append"
                  >
                    ~
                  </InputGroupAddon>
                  <DatePicker
                    className="form-control"
                    selected={this.state.toDate}
                    onChange={this.handleChangeToDate}
                    dateFormat="YYYY/MM/DD"
                    locale="en-us"
                    placeholderText="yyyy/mm/dd"
                    name="toDate"
                    autocompete="off"
                    value={this.state.endTime}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs="12" md="12">
              <FormGroup>
                <Label htmlFor="content">{I18nUtils.t('content')}</Label>
                <TextInput
                  name="content"
                  id="content"
                  multiline
                  required
                  value={this.state.content}
                  onChange={this.handleChange}
                  rows="5"
                  placeholder={I18nUtils.t('all-place-input')}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="12" className="mt-3">
              <div className="btns-group text-left">
                <Button color="success">{I18nUtils.t('btn-update')}</Button>
                <Button
                  title={I18nUtils.t('ots-title-back-list')}
                  onClick={this.redirectToListPage}
                  color="danger"
                >
                  {I18nUtils.t('btn-back')}
                </Button>
              </div>
            </Col>
          </Row>
        </ValidationForm>
      </Container>
    )
  }
}

EditExhibitionPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  exhibitionGetRequest: PropTypes.func,
  exhibitionEditRequest: PropTypes.func,
  data: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.exhibitions.processing,
    data: state.exhibitions.data
  }
}

const mapDispatchToProps = dispatch => ({
  exhibitionGetRequest: data =>
    dispatch(ExhibitionActions.exhibitionGetRequest(data)),
  exhibitionEditRequest: data =>
    dispatch(ExhibitionActions.exhibitionEditRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditExhibitionPage))
