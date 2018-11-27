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
import CategoryActions from '../../redux/wrapper/CategoriesRedux'
import { toast } from 'react-toastify'

class AddNewSubCategoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      type: 2, //Type 1: Category, 2:Sub category,
      category: '',
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
    this.props.history.push('/manage-category-list')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.isAdd) {
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
    data.append('order', this.state.order)
    this.props.cateAddRequest(data)
  }

  render() {
    return (
      <Container fluid className="add-new-category">
        <Helmet>
          <title>{I18nUtils.t('cate-add-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('cate-add-page-title')}
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

AddNewSubCategoryPage.propTypes = {
  history: PropTypes.object,
  cateAddRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.categories.processing,
    data: state.categories.data
  }
}

const mapDispatchToProps = dispatch => ({
  cateAddRequest: data => dispatch(CategoryActions.cateAddRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddNewSubCategoryPage))
