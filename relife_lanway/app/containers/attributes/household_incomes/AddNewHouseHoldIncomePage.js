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
import I18nUtils from '../../../utils/I18nUtils'
import AttributeActions from '../../../redux/wrapper/AttributesRedux'
import { toast } from 'react-toastify'

class AddNewHouseHoldIncomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      title: '',
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
    this.props.history.push('/manage-household-income-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.isAdd) {
        if (data.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage({ id: 'SU001' }, { name: this.state.title })
          )
        }
        if (data.messageCode === 'FA001') {
          toast.error(I18nUtils.t('FA001'))
        }
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('title', this.state.title)
    data.append('order', this.state.order)
    this.props.attributeHouseIncomeAddRequest(data)
  }

  render() {
    return (
      <Container fluid className="add-new-attribute">
        <Helmet>
          <title>{I18nUtils.t('att-hincome-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('att-hincome-add-page-title')}
          </h1>
        </div>
        <ValidationForm
          className="form-add-attribute col-no-mg"
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="name">{I18nUtils.t('title')}</Label>
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
                <Label htmlFor="name">{I18nUtils.t('order')}</Label>
                <TextInput
                  type="text"
                  name="order"
                  id="order"
                  placeholder={I18nUtils.t('all-place-input')}
                  value={this.state.order}
                  onChange={this.handleChange}
                  required
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

AddNewHouseHoldIncomePage.propTypes = {
  history: PropTypes.object,
  attributeHouseIncomeAddRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  attributeHouseIncomeAddRequest: data =>
    dispatch(AttributeActions.attributeHouseIncomeAddRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewHouseHoldIncomePage))
