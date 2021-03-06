/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Button, Row, Col, FormGroup, Label } from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import LocationActions from '../../redux/wrapper/LocationsRedux'
import { toast } from 'react-toastify'

class AddNewLocationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      type: 1, //Type 1: City, 2: District
      name: '',
      order: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirectToListPage = this.redirectToListPage.bind(this)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-location-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.isAdd) {
        if (data.messageCode === 'LOC001')
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-add-sucess' },
              { name: this.state.name }
            )
          )
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('type', this.state.type)
    data.append('name', this.state.name)
    data.append('name_en', this.state.name)
    data.append('order', this.state.order)
    this.props.locationAddRequest(data)
  }

  render() {
    return (
      <Container fluid className="add-new-location">
        <Helmet>
          <title>{I18nUtils.t('loc-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('loc-add-page-title')}
          </h1>
        </div>
        <ValidationForm
          className="form-add-location` col-no-mg"
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="name">{I18nUtils.t('name')}</Label>
                <TextInput
                  type="text"
                  name="name"
                  id="name"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="order">{I18nUtils.t('order')}</Label>
                <TextInput
                  type="text"
                  name="order"
                  id="order"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.order}
                  onChange={this.handleChange}
                  required
                  pattern="\d*"
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

AddNewLocationPage.propTypes = {
  history: PropTypes.object,
  locationAddRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data
  }
}

const mapDispatchToProps = dispatch => ({
  locationAddRequest: data => dispatch(LocationActions.locationAddRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewLocationPage))
