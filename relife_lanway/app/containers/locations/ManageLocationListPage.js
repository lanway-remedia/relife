/* eslint-disable no-debugger */
/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  ListGroup,
  ListGroupItem,
  Badge,
  UncontrolledCollapse,
  FormGroup,
  Label
} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import LocationActions from '../../redux/wrapper/LocationsRedux'
import { toast } from 'react-toastify'
import { DefaultValue } from '../../constants'

class ManageLocationListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      type: 1, //Type locations (1: City, 2: District)
      locationList: [],
      collapse: false,
      id: '',
      name: '',
      order: '',
      city: ''
    }
    this.toggle = this.toggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.addNewDistrictDialog = this.addNewDistrictDialog.bind(this)
    this.handleAddDistrict = this.handleAddDistrict.bind(this)
    this.handleDialogEdit = this.handleDialogEdit.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.okDeleteFunction = this.okDeleteFunction.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getLocationList = this.getLocationList.bind(this)
  }

  getLocationList() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page,
      type: this.state.type
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.locationListRequest(data)
  }

  componentDidMount() {
    this.getLocationList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        if (response.data.count === 0) {
          toast.warn(I18nUtils.t('toast-no-record'))
        }
        this.setState({
          locationList: response.data.results,
          count: response.data.count
        })
      }
      if (response.isAdd) {
        if (response.messageCode === 'LOC001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-add-sucess' },
              { name: this.state.name }
            )
          )

          this.forceUpdate(this.getLocationList)
        }
      }

      if (response.isEdit) {
        if (response.messageCode === 'LOC004') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-edit-sucess' },
              { name: this.state.name }
            )
          )
        }
        if (this.state.city) {
          this.setState({
            type: 1
          })
        }
        this.forceUpdate(this.getLocationList)
      }

      if (response.isDelete) {
        toast.success(
          I18nUtils.formatMessage(
            { id: 'toast-del-sucess' },
            { name: this.state.name }
          )
        )
        this.forceUpdate(this.getLocationList)
      }
    }

    return null
  }

  componentWillUnmount() {
    this.getLocationList()
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  addNewDistrictDialog = city => {
    const formAdd = (
      <ValidationForm
        className="popup-location col-no-mg"
        onSubmit={this.handleAddDistrict}
      >
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="name">{I18nUtils.t('name')}</Label>
              <TextInput
                type="text"
                name="name"
                id="name"
                placeholder={I18nUtils.t('all-place-input')}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="order">{I18nUtils.t('order')}</Label>
              <TextInput
                type="text"
                name="order"
                id="order"
                placeholder={I18nUtils.t('all-place-input')}
                onChange={this.handleChange}
                required
                pattern="\d*"
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12" className="col-footer">
            <div className="btns-group text-right pt-4">
              <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
              <Button
                title={I18nUtils.t('ots-title-back-list')}
                onClick={this.handleCloseModal}
                color="danger"
              >
                {I18nUtils.t('close')}
              </Button>
            </div>
          </Col>
        </Row>
      </ValidationForm>
    )

    this.props.show(ModalName.COMMON, {
      modalClass: 'center-modal hide-footer',
      title: I18nUtils.formatMessage(
        { id: 'modal-loc-add-header' },
        { name: city.name }
      ),
      message: formAdd,
      hideCloseButton: true
    })

    this.setState({
      city: city.id
    })
  }

  handleAddDistrict = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('type', '2') // Type District
    data.append('name', this.state.name)
    data.append('name_en', this.state.name)
    data.append('order', this.state.order)
    data.append('city', this.state.city)
    this.props.locationAddRequest(data)
    this.props.hide(ModalName.COMMON)
  }

  handleDialogEdit = city => {
    const formAdd = (
      <ValidationForm
        className="popup-location col-no-mg"
        onSubmit={this.handleEditSubmit}
      >
        <Row>
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="name">{I18nUtils.t('name')}</Label>
              <TextInput
                type="text"
                name="name"
                id="name"
                defaultValue={city.name}
                placeholder={I18nUtils.t('all-place-input')}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="order">{I18nUtils.t('order')}</Label>
              <TextInput
                type="text"
                name="order"
                id="order"
                defaultValue={city.order}
                placeholder={I18nUtils.t('all-place-input')}
                onChange={this.handleChange}
                required
                pattern="\d*"
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12" className="col-footer">
            <div className="btns-group text-right pt-4">
              <Button color="success">{I18nUtils.t('btn-edit')}</Button>
              <Button
                title={I18nUtils.t('ots-title-back-list')}
                onClick={this.handleCloseModal}
                color="danger"
              >
                {I18nUtils.t('close')}
              </Button>
            </div>
          </Col>
        </Row>
      </ValidationForm>
    )

    this.props.show(ModalName.COMMON, {
      modalClass: 'center-modal hide-footer',
      title: I18nUtils.formatMessage(
        { id: 'modal-loc-edit-header' },
        { name: city.name }
      ),
      message: formAdd,
      hideCloseButton: true
    })

    if (city.city)
      this.setState({
        id: city.id,
        type: 2,
        city: city.city
      })
    else
      this.setState({
        id: city.id
      })
  }

  handleEditSubmit = e => {
    e.preventDefault()
    let data = new FormData()

    data.append('type', this.state.type) // Type Location // 1: City, 2 : District
    data.append('id', this.state.id)
    data.append('name', e.target.name.value)
    data.append('name_en', e.target.name.value)
    data.append('order', e.target.order.value)
    if (this.state.type === 2) data.append('city', this.state.city)

    this.props.locationEditRequest(data)
    this.props.hide(ModalName.COMMON)
  }

  handleDelete = city => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: city.name }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okDeleteFunction(city)
    })
  }

  okDeleteFunction = city => {
    let type = 1 // Type 1: City
    if (city.city) {
      const originLocationList = this.state.locationList
      for (let i = 0; i < originLocationList.length; i++) {
        if (originLocationList[i].id === city.city) {
          originLocationList[i].districts = originLocationList[
            i
          ].districts.filter(c => c.id !== city.id)
          this.setState({ locationList: originLocationList })
        }
      }
      type = 2 // Type 2: District
    } else {
      const originLocationList = this.state.locationList
      const locationList = originLocationList.filter(c => c.id !== city.id)
      this.setState({ locationList, name: city.name })
    }

    let data = {
      id: city.id,
      type: type //Type Location (1: City, 2: District)
    }

    this.props.locationDeleteRequest(data)
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleCloseModal = () => {
    this.props.hide(ModalName.COMMON)
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-location')
  }

  render() {
    let { page, limit, count, locationList } = this.state

    return (
      <Container fluid className="manage-location-list">
        <Helmet>
          <title>{I18nUtils.t('loc-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('loc-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
        <FilterGroupComponent inputTitle="Name" />
        <div className="formTable">
          <PaginationComponent count={count} />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Name,Order,Action"
            />
            <tbody>
              {locationList.length === 0 && (
                <tr>
                  <td colSpan="4" className="alert alert-warning">
                    {I18nUtils.t('toast-no-record')}
                  </td>
                </tr>
              )}
              {locationList.map((city, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td className="name-style">
                      <div className="clearfix">
                        {city.name}
                        {city.districts.length !== 0 && (
                          <Button
                            color="primary"
                            onClick={this.toggle}
                            size="sm"
                            className="float-right"
                            id={'loc-' + city.id}
                          >
                            {I18nUtils.t('loc-dis-showhide')}
                          </Button>
                        )}
                      </div>

                      {city.districts.length !== 0 && (
                        <UncontrolledCollapse
                          toggler={'loc-' + city.id}
                          // isOpen={this.state.collapse}
                        >
                          <ListGroup className="mt-3 clearfix">
                            {city.districts.map((dis, idex) => {
                              return (
                                <ListGroupItem key={idex}>
                                  {dis.name}
                                  <Badge pill color="primary" className="ml-2">
                                    {I18nUtils.t('order')} : {dis.order}
                                  </Badge>
                                  <Button
                                    title={I18nUtils.t('delete')}
                                    color="danger"
                                    outline
                                    size="sm"
                                    className="float-right"
                                    onClick={() => this.handleDelete(dis)}
                                  >
                                    <i className="fa fa-trash" />
                                  </Button>
                                  <Button
                                    title={I18nUtils.t('edit')}
                                    color="primary"
                                    outline
                                    size="sm"
                                    className="float-right mr-2"
                                    onClick={() => this.handleDialogEdit(dis)}
                                  >
                                    <i className="fa fa-edit" />
                                  </Button>
                                </ListGroupItem>
                              )
                            })}
                          </ListGroup>
                        </UncontrolledCollapse>
                      )}
                    </td>
                    <td>{city.order}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('loc-add-dis')}
                        color="success"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.addNewDistrictDialog(city)}
                      >
                        <i className="fa fa-plus" />
                      </Button>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDialogEdit(city)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDelete(city)}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    )
  }
}

ManageLocationListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  locationListRequest: PropTypes.func,
  locationDeleteRequest: PropTypes.func,
  locationAddRequest: PropTypes.func,
  locationEditRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  order: PropTypes.string,
  city: PropTypes.string,
  locationList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  locationListRequest: data =>
    dispatch(LocationActions.locationListRequest(data)),
  locationDeleteRequest: data =>
    dispatch(LocationActions.locationDeleteRequest(data)),
  locationAddRequest: data =>
    dispatch(LocationActions.locationAddRequest(data)),
  locationEditRequest: data =>
    dispatch(LocationActions.locationEditRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageLocationListPage))
