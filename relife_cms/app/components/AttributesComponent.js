/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AttributeActions from '../redux/wrapper/AttributesRedux'
import { Col, Label, FormGroup } from 'reactstrap'
import Select from 'react-select'
import I18nUtils from '../utils/I18nUtils'

class AttributesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataCons: [],
      dataFloor: [],
      dataPrice: [],
      dataStyle: [],
      dataHI: [],
      dataHS: [],
      optionSelected: [],
      contruction: {},
      floor: {},
      price: {},
      housestyle: {},
      houseincome: {},
      housesize: {}
    }
  }

  getContructionList() {
    this.props.attributeContructionListRequest({})
  }

  getFloorList() {
    this.props.attributeFloorListRequest({})
  }

  getPriceList() {
    this.props.attributePriceListRequest({})
  }

  getStyleList() {
    this.props.attributeStyleListRequest({})
  }

  getHouseIncomeList() {
    this.props.attributeHouseIncomeListRequest({})
  }

  getHouseSizeList() {
    this.props.attributeHouseSizeListRequest({})
  }

  componentDidMount() {
    this.getContructionList()
    this.getFloorList()
    this.getPriceList()
    this.getStyleList()
    this.getHouseIncomeList()
    this.getHouseSizeList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataAttributes != nextProps.dataAttributes) {
      const response = nextProps.dataAttributes
      let obj = {}
      obj['id'] = 0
      obj['title'] = I18nUtils.t('lb-select-vl')
      response.data.unshift(obj)

      console.log(response)

      if (response.isGetListHS)
        this.setState({
          dataHS: response.data
        })

      if (response.isGetListContruction)
        this.setState({
          dataCons: response.data
        })

      if (response.isGetListStyle)
        this.setState({
          dataStyle: response.data
        })

      if (response.isGetListHI)
        this.setState({
          dataHI: response.data
        })

      if (response.isGetListPrice)
        this.setState({
          dataPrice: response.data
        })

      if (response.isGetListFloor)
        this.setState({
          dataFloor: response.data
        })
    }
  }

  handleChange = (e, name) => {
    // const optionSelected = { ...this.state.optionSelected }
    // optionSelected[] = e
    let data = e
    this.setState(
      {
        optionSelected: { data, name },
        [name]: e
      },
      () => {
        console.log(this.state.optionSelected)
      }
    )
    this.props.selectOption(this.state.optionSelected)
  }

  render() {
    let {
      dataCons,
      dataFloor,
      dataPrice,
      dataStyle,
      dataHI,
      dataHS,
      contruction,
      floor,
      price,
      housestyle,
      houseincome,
      housesize
    } = this.state
    return (
      <React.Fragment>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="status">{I18nUtils.t('contruction')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="contruction"
              value={contruction}
              options={dataCons}
              defaultValue={dataCons[0]}
              onChange={e => this.handleChange(e, 'contruction')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="status">{I18nUtils.t('floor')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="floor"
              value={floor}
              options={dataFloor}
              defaultValue={dataFloor[0]}
              onChange={e => this.handleChange(e, 'floor')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="status">{I18nUtils.t('price')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="price"
              value={price === null ? dataPrice[0] : price}
              options={dataPrice}
              onChange={e => this.handleChange(e, 'price')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="housestyle">{I18nUtils.t('housestyle')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="housestyle"
              value={housestyle || dataStyle[0]}
              options={dataStyle}
              onChange={e => this.handleChange(e, 'housestyle')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="houseincome">{I18nUtils.t('houseincome')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="houseincome"
              value={houseincome || dataHI[0]}
              options={dataHI}
              onChange={e => this.handleChange(e, 'houseincome')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md="4">
          <FormGroup className="react-select">
            <Label for="housesize">{I18nUtils.t('housesize')}</Label>
            <Select
              className="react-select-ops"
              classNamePrefix="rs-cus"
              isClearable={false}
              isSearchable={false}
              id="housesize"
              value={housesize || dataHS[0]}
              options={dataHS}
              onChange={e => this.handleChange(e, 'housesize')}
              getOptionLabel={({ title }) => title}
              getOptionValue={({ id }) => id}
              placeholder={I18nUtils.t('lb-select-vl')}
            />
          </FormGroup>
        </Col>
      </React.Fragment>
    )
  }
}

AttributesComponent.propTypes = {
  history: PropTypes.object,
  dataAttributes: PropTypes.object,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  attributePriceListRequest: PropTypes.func,
  selectOption: PropTypes.func
}
const mapStateToProps = state => {
  return {
    processing: state.exampleHouses.processing,
    dataAttributes: state.attributes.data
  }
}
const mapDispatchToProps = dispatch => ({
  attributeContructionListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeContructionListRequest(dataAttributes)),
  attributeFloorListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeFloorListRequest(dataAttributes)),
  attributeStyleListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeStyleListRequest(dataAttributes)),
  attributeHouseIncomeListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeHouseIncomeListRequest(dataAttributes)),
  attributeHouseSizeListRequest: dataAttributes =>
    dispatch(AttributeActions.attributeHouseSizeListRequest(dataAttributes)),
  attributePriceListRequest: dataAttributes =>
    dispatch(AttributeActions.attributePriceListRequest(dataAttributes))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AttributesComponent))
