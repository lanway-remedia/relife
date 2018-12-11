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
import TagActions from '../../redux/wrapper/TagsRedux'
import { toast } from 'react-toastify'

class AddNewTagPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: ''
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
    this.props.history.push('/manage-tag-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.isAdd) {
        if (data.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-add-sucess' },
              { name: this.state.name }
            )
          )
        }
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('name', this.state.name)
    this.props.tagAddRequest(data)
  }

  render() {
    return (
      <Container fluid className="add-new-tag">
        <Helmet>
          <title>{I18nUtils.t('tag-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('tag-add-page-title')}
          </h1>
        </div>
        <ValidationForm
          className="form-add-outletstore col-no-mg"
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

AddNewTagPage.propTypes = {
  history: PropTypes.object,
  tagAddRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.tags.processing,
    data: state.tags.data
  }
}

const mapDispatchToProps = dispatch => ({
  tagAddRequest: data => dispatch(TagActions.tagAddRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewTagPage))
