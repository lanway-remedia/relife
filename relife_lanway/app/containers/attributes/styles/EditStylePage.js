/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AttributeActions from '../../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../../utils/I18nUtils'
import { Container, Button, Row, Col, FormGroup, Label } from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

class EditStylePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: '',
      title: '',
      order: ''
    }
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.attributeStyleGetRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.data === undefined || response.data.length === 0) {
        toast.error(I18nUtils.t('toast-no-data'))
        this.props.history.replace('/manage-house-style-list')
      } else {
        if (response.isGetId)
          this.setState({
            data: response.data,
            id: response.data.id,
            title: response.data.title,
            order: response.data.order
          })
      }
      if (response.isEdit) {
        if (response.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'SU001' },
              { name: response.data.title }
            )
          )
        }
        if (response.messageCode === 'FA001') {
          toast.error(I18nUtils.t('FA001'))
        }
      }
    }
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-house-style-list')
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('id', this.state.id)
    data.append('title', this.state.title)
    data.append('order', this.state.order)
    this.props.attributeStyleEditRequest(data)
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
    let { data } = this.state
    return (
      <Container fluid className="edit-attribute">
        <Helmet>
          <title>
            {I18nUtils.formatMessage(
              { id: 'att-style-ed-page-title' },
              { name: data.title }
            )}
          </title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.formatMessage(
              { id: 'att-style-ed-page-title' },
              { name: data.title }
            )}
          </h1>
        </div>

        <ValidationForm
          className="form-edit-attribute col-no-mg"
          onSubmit={this.handleSubmit}
        >
          <Row>
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
                <Label htmlFor="title">{I18nUtils.t('order')}</Label>
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

EditStylePage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  attributeStyleGetRequest: PropTypes.func,
  attributeStyleEditRequest: PropTypes.func,
  data: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  attributeStyleGetRequest: data =>
    dispatch(AttributeActions.attributeStyleGetRequest(data)),
  attributeStyleEditRequest: data =>
    dispatch(AttributeActions.attributeStyleEditRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditStylePage))
