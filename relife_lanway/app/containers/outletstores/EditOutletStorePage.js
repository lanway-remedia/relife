/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import ImageUploadComponent from './../../components/ImageUploadComponent'
import I18nUtils from '../../utils/I18nUtils'
import { Container, Button, Row, Col, FormGroup, Label } from 'reactstrap'
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from 'react-bootstrap4-form-validation'
import validator from 'validator'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

class EditOutletStorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      thumbnailImage: null,
      id: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      zipcode: '',
      traffic: '',
      website: '',
      regularHoliday: '',
      timeServing: '',
      content: '',
      city: '',
      district: ''
    }
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.outletStoreGetRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.data === undefined || response.data.length === 0) {
        toast.error(I18nUtils.t('toast-no-data'))
        this.props.history.replace('/manage-outlet-store-list')
      } else {
        this.setState({
          data: response.data,
          id: response.data.id,
          title: response.data.title,
          email: response.data.email,
          phone: response.data.tel,
          address: response.data.address,
          city: response.data.id,
          district: response.data.district,
          zipcode: response.data.zipcode,
          traffic: response.data.traffic,
          website: response.data.home_page,
          regularHoliday: response.data.regular_holiday,
          timeServing: response.data.time_serving,
          content: response.data.content,
          thumbnailImage: response.data.img_large
        })
      }
    }
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-outlet-store-list')
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

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('id', this.state.id)
    data.append('latitude', 111111)
    data.append('longitude', 222222)
    data.append('title', this.state.title)
    data.append('email', this.state.email)
    data.append('tel', this.state.phone)
    data.append('address', this.state.address)
    data.append('zipcode', this.state.zipcode)
    data.append('traffic', this.state.traffic)
    data.append('home_page', this.state.website)
    data.append('regular_holiday', this.state.regularHoliday)
    data.append('time_serving', this.state.timeServing)
    data.append('content', this.state.content)
    data.append('district_id', this.state.district)

    if (typeof this.state.thumbnailImage !== 'string') {
      data.append('img_large', this.state.thumbnailImage)
    }
    this.props.outletStoreEditRequest(data)
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
                <Label htmlFor="phone">{I18nUtils.t('phone')}</Label>
                <TextInput
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.phone}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="email">{I18nUtils.t('email')}</Label>
                <TextInput
                  type="text"
                  name="email"
                  id="email"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.email}
                  onChange={this.handleChange}
                  validator={validator.isEmail}
                  errorMessage={{ validator: I18nUtils.t('validate-email') }}
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
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="district">{I18nUtils.t('district')}</Label>
                <SelectGroup
                  name="district"
                  id="district"
                  required
                  errorMessage={I18nUtils.t('lb-select')}
                  onChange={this.handleChange}
                  value={
                    this.state.district === null ? ' ' : this.state.district.id
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
                <Label htmlFor="traffic">{I18nUtils.t('traffic')}</Label>
                <TextInput
                  type="text"
                  name="traffic"
                  id="traffic"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.traffic}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="website">{I18nUtils.t('website')}</Label>
                <TextInput
                  type="text"
                  name="website"
                  id="website"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.website}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="regularHoliday">
                  {I18nUtils.t('regular-holiday')}
                </Label>
                <TextInput
                  type="text"
                  name="regularHoliday"
                  id="regularHoliday"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.regularHoliday}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="timeServing">
                  {I18nUtils.t('time-serving')}
                </Label>
                <TextInput
                  type="text"
                  name="timeServing"
                  id="timeServing"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.timeServing}
                  onChange={this.handleChange}
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

EditOutletStorePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  outletStoreGetRequest: PropTypes.func,
  outletStoreEditRequest: PropTypes.func,
  data: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data
  }
}

const mapDispatchToProps = dispatch => ({
  outletStoreGetRequest: data =>
    dispatch(OutletStoreActions.outletStoreGetRequest(data)),
  outletStoreEditRequest: data =>
    dispatch(OutletStoreActions.outletStoreEditRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditOutletStorePage))