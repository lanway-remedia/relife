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
  InputGroup,
  InputGroupAddon
} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import ExhibitionActions from '../../redux/wrapper/ExhibitionsRedux'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import ImageUploadComponent from './../../components/ImageUploadComponent'
import LocationsComponent from '../../components/LocationsComponent'

class AddNewExhibitionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thumbnailImage: null,
      data: [],
      title: '',
      address: '',
      zipcode: '',
      content: '',
      city: '',
      district: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
    this.handleSelectedCity = this.handleSelectedCity.bind(this)
    this.handleSelectedDistrict = this.handleSelectedDistrict.bind(this)
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

  redirectToListPage = () => {
    this.props.history.push('/manage-exhibition-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.isAddStore) {
        toast.success(
          I18nUtils.formatMessage(
            { id: 'toast-add-sucess' },
            { name: this.state.title }
          )
        )
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    let data = new FormData()
    data.append('num_attend', 111111)
    data.append('latitude', 111111)
    data.append('longtitude', 222222)
    data.append('title', this.state.title)
    data.append('address', this.state.address)
    data.append('zipcode', this.state.zipcode)
    data.append('content', this.state.content)
    data.append('city', this.state.city)
    data.append('district_id', this.state.district)
    data.append('start_time', moment(this.state.fromDate).format('YYYY/MM/DD'))
    data.append('end_time', moment(this.state.toDate).format('YYYY/MM/DD'))
    data.append('img_large', this.state.thumbnailImage)
    this.props.exhibitionAddRequest(data)
  }

  render() {
    let { thumbnailImage } = this.state
    return (
      <Container fluid className="add-new-exhibition">
        <Helmet>
          <title>{I18nUtils.t('exh-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('exh-add-page-title')}
          </h1>
        </div>
        <ValidationForm
          className="form-add-outletstore col-no-mg"
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
                  value={this.state.title}
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
                  />
                </InputGroup>
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
            />
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
                <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
                <Button
                  title={I18nUtils.t('exh-title-back-list')}
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

AddNewExhibitionPage.propTypes = {
  history: PropTypes.object,
  exhibitionAddRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.exhibitions.processing,
    data: state.exhibitions.data
  }
}

const mapDispatchToProps = dispatch => ({
  exhibitionAddRequest: data =>
    dispatch(ExhibitionActions.exhibitionAddRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewExhibitionPage))
