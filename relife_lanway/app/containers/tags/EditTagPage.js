/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TagActions from '../../redux/wrapper/TagsRedux'
import I18nUtils from '../../utils/I18nUtils'
import { Container, Button, Row, Col, FormGroup, Label } from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

class EditTagPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: '',
      name: ''
    }
    this.redirectToListPage = this.redirectToListPage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.tagGetRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.data === undefined || response.data.length === 0) {
        toast.error(I18nUtils.t('toast-no-data'))
        this.props.history.replace('/manage-tag-list')
      } else {
        this.setState({
          data: response.data,
          id: response.data.id,
          name: response.data.name
        })
      }
      if (response.isEdit) {
        if (response.messageCode === 'TAG004') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-edit-sucess' },
              { name: response.data.name }
            )
          )
        }
        if (response.messageCode === 'TAG005') {
          toast.success(I18nUtils.t('TAG005'))
        }
      }
    }
  }

  redirectToListPage = () => {
    this.props.history.push('/manage-tag-list')
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
    data.append('name', this.state.name)
    this.props.tagEditRequest(data)
    if (this.props.processing) {
      toast.success(
        I18nUtils.formatMessage(
          { id: 'toast-edit-sucess' },
          { name: this.state.name }
        )
      )
    }
  }

  render() {
    let { data } = this.state
    return (
      <Container fluid className="edit-tags">
        <Helmet>
          <title>
            {I18nUtils.formatMessage(
              { id: 'tag-ed-page-title' },
              { name: data.name }
            )}
          </title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.formatMessage(
              { id: 'tag-ed-page-title' },
              { name: data.name }
            )}
          </h1>
        </div>

        <ValidationForm
          className="form-edit-outletstore col-no-mg"
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label htmlFor="title">{I18nUtils.t('name')}</Label>
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

EditTagPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  tagGetRequest: PropTypes.func,
  tagEditRequest: PropTypes.func,
  data: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.tags.processing,
    data: state.tags.data
  }
}

const mapDispatchToProps = dispatch => ({
  tagGetRequest: data => dispatch(TagActions.tagGetRequest(data)),
  tagEditRequest: data => dispatch(TagActions.tagEditRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditTagPage))
