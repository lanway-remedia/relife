import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, FormGroup, Button, CustomInput } from 'reactstrap'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../utils/I18nUtils'

class AttributesSearchPC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listPrice: [],
      listConstruction: [],
      listFloor: [],
      listStyle: [],
      listHouseSize: [],
      listHouseIncome: [],
      listCommitment: [],

      priceRange: [],
      construction: [],
      floor: [],
      style: [],
      houseSize: [],
      houseIncome: [],
      commitment: [],
    }
  }

  componentWillMount() {
    let data = {
      limit: '',
      offset: '' 
    }
    this.props.attributeContructionListRequest(data)
    this.props.attributeFloorListRequest(data)
    this.props.attributeStyleListRequest(data)
    this.props.attributeHouseIncomeListRequest(data)
    this.props.attributeHouseSizeListRequest(data)
    this.props.attributePriceListRequest(data)
    this.props.attributeCommitmentListRequest(data)

    let params = new URLSearchParams(this.props.history.location.search)

    let priceParams = params.get('price_range__in')
    let floorParams = params.get('floor__in')
    let constructionParams = params.get('contruction__in')
    let styleParams = params.get('styles__style__in')
    let houseSizeParams = params.get('household_size__in')
    let houseIncomeParams = params.get('household_income__in')
    let commitmentParams = params.get('commitment__in')

    this.setState({
      priceRange: priceParams ? priceParams.split(',') : [],
      floor: floorParams ? floorParams.split(',') : [],
      construction: constructionParams ? constructionParams.split(',') : [],
      style: styleParams ? styleParams.split(',') : [],
      houseSize: houseSizeParams ? houseSizeParams.split(',') : [],
      houseIncome: houseIncomeParams ? houseIncomeParams.split(',') : [],
      commitment: commitmentParams ? commitmentParams.split(',') : [],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      //list price range
      if (response.isGetListPrice) {
        this.setState({
          listPrice: response.data
        })
      }

      // list construction
      if (response.isGetListConstrution) {
        this.setState({
          listConstruction: response.data
        })
      }

      // list floor
      if (response.isGetListFloor) {
        this.setState({
          listFloor: response.data
        })
      }

      // list style
      if (response.isGetListStyle) {
        this.setState({
          listStyle: response.data
        })
      }

      // list house hold size
      if (response.isGetListHouseSize) {
        this.setState({
          listHouseSize: response.data
        })
      }
      // list house hold income
      if (response.isGetListHouseIncome) {
        this.setState({
          listHouseIncome: response.data
        })
      }
      // list commitment
      if (response.isGetListCommitment) {
        this.setState({
          listCommitment: response.data
        })
      }
    }
  }

  handleResetForm = () => {
    this.props.history.push({
      search: `` 
    })

    this.setState({
      priceRange: [],
      construction: [],
      floor: [],
      style: [],
      houseSize: [],
      houseIncome: [],
      commitment: []
    })
    document.getElementById('frm-search-pc').reset()
    this.props.onPageLoad()
  }

  handleChange = (e) => {
    const name = e.target.name
    let itemChecked
    if (name == 'priceRange') {
      itemChecked = this.state.priceRange
    } else if (name == 'construction') {
      itemChecked = this.state.construction
    } else if (name == 'floor') {
      itemChecked = this.state.floor
    } else if (name == 'style') {
      itemChecked = this.state.style
    } else if (name == 'houseSize') {
      itemChecked = this.state.houseSize
    } else if (name == 'houseIncome') {
      itemChecked = this.state.houseIncome
    } else if (name == 'commitment') {
      itemChecked = this.state.commitment
    }

    const value = e.target.value
    const isChecked = e.target.checked

    if (isChecked === false) {
      itemChecked = itemChecked.filter(item => item !== value)
    } else {
      itemChecked.push(value)
    }
    this.setState({
      [e.target.name] : itemChecked
    })
  }

  onClickSubmit = () => {
    let {priceRange, floor, construction, style, houseSize, houseIncome, commitment} = this.state
    let priceParam = priceRange.join(',')
    let floorParam = floor.join(',')
    let constructionParam = construction.join(',')
    let styleParam = style.join(',')
    let houseSizeParam = houseSize.join(',')
    let houseIncomeParam = houseIncome.join(',')
    let commitmentParam = commitment.join(',')

    let parsed = {
      ...(priceRange.length > 0 && { price_range__in: priceParam }),
      ...(floor.length > 0 && { floor__in: floorParam }),
      ...(construction.length > 0 && { contruction__in: constructionParam }),
      ...(style > 0 && { styles__style__in: styleParam }),
      ...(houseSize.length > 0 && { household_size__in: houseSizeParam }),
      ...(houseIncome.length > 0 && { household_income__in: houseIncomeParam }),
      ...(commitment.length > 0 && { commitment__in: commitmentParam }),
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}`
    })

    this.props.onPageLoad()
  }

  render() {
    const { listConstruction, listFloor, listPrice, listStyle, listHouseSize, listHouseIncome, listCommitment,
            priceRange, floor, construction, style, houseSize, houseIncome, commitment,
          } = this.state
    return (
      <section className="side pc">
        <Form id="frm-search-pc" >
          <div className="sidebar-search-choices">
            {/* list price */}
            <div className="sidebar-search-choices-inner">
                <div className="search-title">{I18nUtils.t('price-range')}</div>
                <FormGroup check>
                  {listPrice.map((val, key) => (
                    <CustomInput
                      key={key}
                      type="checkbox"
                      value={val.id}
                      id={`${val.title}_${val.id}_price_pc`}
                      label={val.title}
                      name="priceRange"
                      onChange={this.handleChange}
                      defaultChecked={priceRange.includes(val.id.toString())}
                    />
                  ))}
                </FormGroup>
            </div>

            {/* listConstruction */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('construction')}</div>
              <FormGroup check>
                {listConstruction.map((val, key) => (
                  <CustomInput
                    key={key}
                    type="checkbox"
                    value={val.id}
                    id={`${val.title}_${val.id}_construction_pc`}
                    label={val.title}
                    name="construction"
                    onChange={this.handleChange}
                    defaultChecked={construction.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            {/* list floor */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('floor')}</div>
              <FormGroup check>
                {listFloor.map((val, key) => (
                  <CustomInput
                  key={key}
                  type="checkbox"
                  value={val.id}
                  id={`${val.title}_${val.title}_floor_pc`}
                  label={val.title}
                  name="floor"
                  onChange={this.handleChange}
                  defaultChecked={floor.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            {/* list style */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('taste')}</div>
              <FormGroup check>
                {listStyle.map((val, key) => (
                  <CustomInput
                    key={key}
                    type="checkbox"
                    value={val.id}
                    id={`${val.title}_${val.id}_taste_pc`}
                    label={val.title}
                    name="style"
                    onChange={this.handleChange}
                    defaultChecked={style.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            {/* list commitment */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('commitment')} </div>
              <FormGroup check>
                {listCommitment.map((val, key) => (
                  <CustomInput
                    key={key}
                    type="checkbox"
                    value={val.id}
                    id={`${val.title}_${val.id}_commitment_pc`}
                    label={val.title}
                    name="commitment"
                    onChange={this.handleChange}
                    defaultChecked={commitment.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            {/* list house hold size */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('household-size1')}</div>
              <FormGroup check>
                {listHouseSize.map((val, key) => (
                  <CustomInput
                    key={key}
                    type="checkbox"
                    value={val.id}
                    id={`${val.title}_${val.id}_housesize_pc`}
                    label={val.title}
                    name="houseSize"
                    onChange={this.handleChange}
                    defaultChecked={houseSize.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            {/* list house hold income */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">{I18nUtils.t('household-income')}</div>
              <FormGroup check> 
                {listHouseIncome.map((val, key) => (
                  <CustomInput
                    key={key}
                    type="checkbox"
                    value={val.id}
                    id={`${val.title}_${val.id}_houseincome_pc`}
                    label={val.title}
                    name="houseIncome"
                    onChange={this.handleChange}
                    defaultChecked={houseIncome.includes(val.id.toString())}
                  />
                ))}
              </FormGroup>
            </div>

            <Button
              type="button" 
              onClick={this.handleResetForm} 
              className="sidebar-clear-btn btn clear-button"
            >
              {I18nUtils.t('search-clear')}
            </Button>
            <Button 
              type="button" 
              onClick={this.onClickSubmit} 
              className="sidebar-search-btn btn btn-default"
            >
              <i className="fa fa-search" />
              {I18nUtils.t('search')}
            </Button>
          </div>
        </Form>
      </section>
    )
  }
}

AttributesSearchPC.propTypes = {
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributePriceListRequest: PropTypes.func,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
  attributeCommitmentListRequest: PropTypes.func,
  onPageLoad: PropTypes.func,
  history: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  attributePriceListRequest: data =>
    dispatch(AttributeActions.attributePriceListRequest(data)),
  attributeContructionListRequest: data =>
    dispatch(AttributeActions.attributeContructionListRequest(data)),
  attributeFloorListRequest: data =>
    dispatch(AttributeActions.attributeFloorListRequest(data)),
  attributeStyleListRequest: data =>
    dispatch(AttributeActions.attributeStyleListRequest(data)),
  attributeHouseSizeListRequest: data =>
    dispatch(AttributeActions.attributeHouseSizeListRequest(data)),
  attributeHouseIncomeListRequest: data =>
    dispatch(AttributeActions.attributeHouseIncomeListRequest(data)),
  attributeCommitmentListRequest: data =>
    dispatch(AttributeActions.attributeCommitmentListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AttributesSearchPC))
