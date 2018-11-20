/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Button, Row, Col, FormGroup, Label } from 'reactstrap'
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import validator from 'validator'

import ImageUploadComponent from './../../components/ImageUploadComponent'

class AddNewOutletStorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thumbnailImage: null,
      data: [],
      title: '',
      email: '',
      phone: '',
      address: '',
      zipcode: '',
      traffic: '',
      ưebsite: '',
      regularHoliday: '',
      timeServing: '',
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.redirectToListPage = this.redirectToListPage.bind(this)
  }

  handleSubmit = () => {}

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

  redirectToListPage = () => {
    this.props.history.push('manage-outlet-store-list')
  }

  render() {
    let { thumbnailImage } = this.state
    return (
      <Container fluid className="add-new-outletstore">
        <Helmet>
          <title>{I18nUtils.t('ots-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('ots-add-page-title')}
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
                size={120}
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
                <Label htmlFor="status">{I18nUtils.t('status')}</Label>
                <SelectGroup
                  name="status"
                  id="status"
                  required
                  errorMessage={I18nUtils.t('lb-select')}
                  onChange={this.handleChange}
                >
                  <option value="">{I18nUtils.t('lb-select')}</option>
                  <option value="1">{I18nUtils.t('lb-enable')}</option>
                  <option value="2">{I18nUtils.t('lb-disabled')}</option>
                </SelectGroup>
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
                <Label htmlFor="city">{I18nUtils.t('city')}</Label>
                <SelectGroup
                  name="city"
                  id="city"
                  required
                  errorMessage={I18nUtils.t('lb-select')}
                  onChange={this.handleChange}
                >
                  <option value="">{I18nUtils.t('lb-select')}</option>
                  <option value="1">{I18nUtils.t('lb-enable')}</option>
                  <option value="2">{I18nUtils.t('lb-disabled')}</option>
                </SelectGroup>
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
                >
                  <option value="">{I18nUtils.t('lb-select')}</option>
                  <option value="1">{I18nUtils.t('lb-enable')}</option>
                  <option value="2">{I18nUtils.t('lb-disabled')}</option>
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
                <Label htmlFor="regular-holiday">
                  {I18nUtils.t('regular-holiday')}
                </Label>
                <TextInput
                  type="text"
                  name="regular-holiday"
                  id="regular-holiday"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.regularHoliday}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="time-serving">
                  {I18nUtils.t('time-serving')}
                </Label>
                <TextInput
                  type="text"
                  name="time-serving"
                  id="time-serving"
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
                <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
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

AddNewOutletStorePage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(AddNewOutletStorePage))
