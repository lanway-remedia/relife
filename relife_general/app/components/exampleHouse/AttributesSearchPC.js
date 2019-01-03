import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Label, Input, FormGroup, Button } from 'reactstrap'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
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

      priceRange: {},
      construction: {},
      floor: {},
      style: {},
      houseSize: {},
      houseIncome: {},

      priceOld: [],
      constructionOld: [],
      floorOld: [],
      styleOld: [],
      houseSizeOld: [],
      houseIncomeOld: [],
    }
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
    }
  }

  handleResetForm = () => {
    document.getElementById('frm-search').reset()
    this.props.history.push('/example')
    this.props.onPageLoad()
  }

  componentDidMount() {
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

    let params = new URLSearchParams(this.props.history.location.search)

    let priceParams = params.get('price_range__in')
    let floorParams = params.get('floor__in')
    let constructionParams = params.get('contruction__in')
    let styleParams = params.get('styles__style__in')
    let houseSizeParams = params.get('household_size__in')
    let houseIncomeParams = params.get('household_income__in')

    let {priceRange, floor, construction, style, houseSize, houseIncome} = this.state

    if (priceParams) {
      let arrPriceOld = priceParams.split(',')
      for (let key in arrPriceOld) {
        priceRange[arrPriceOld[key]] = true
      }
    }

    if (floorParams) {
      let arrFloorOld = floorParams.split(',')
      for (let key in arrFloorOld) {
        floor[arrFloorOld[key]] = true
      }
    }

    if (constructionParams) {
      let arrConstructionOld = constructionParams.split(',')
      for (let key in arrConstructionOld) {
        construction[arrConstructionOld[key]] = true
      }
    }

    if (styleParams) {
      let arrStyleOld = styleParams.split(',')
      for (let key in arrStyleOld) {
        style[arrStyleOld[key]] = true
      }
    }

    if (houseSizeParams) {
      let arrHouseSizeOld = houseSizeParams.split(',')
      for (let key in arrHouseSizeOld) {
        houseSize[arrHouseSizeOld[key]] = true
      }
    }

    if (houseIncomeParams) {
      let arrHouseIncomeOld = houseIncomeParams.split(',')
      for (let key in arrHouseIncomeOld) {
        houseIncome[arrHouseIncomeOld[key]] = true
      }
    }

    this.setState({
      priceOld: priceParams ? priceParams.split(',') : '',
      constructionOld: constructionParams ? constructionParams.split(',') : '',
      floorOld: floorParams ? floorParams.split(',') : '',
      styleOld: styleParams ? styleParams.split(',') : '',
      houseSizeOld: houseSizeParams ? houseSizeParams.split(',') : '',
      houseIncomeOld: houseIncomeParams ? houseIncomeParams.split(',') : ''
    })

    this.setState({
      priceRange: priceRange,
      floor: floor,
      construction: construction,
      style: style,
      houseSize: houseSize,
      houseIncome: houseIncome
    })
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
    }

    const value = e.target.value
    const isChecked = e.target.checked

    if (isChecked == false) {
      delete itemChecked[value]
    } else {
      itemChecked[value] = value
    }
    this.setState({
      [e.target.name] : itemChecked
    })
  }

  onClickSubmit = () => {
    let {priceRange, floor, construction, style, houseSize, houseIncome} = this.state
    let priceParam = Object.values(priceRange).join(',')
    let floorParam = Object.values(floor).join(',')
    let constructionParam = Object.values(construction).join(',')
    let styleParam = Object.values(style).join(',')
    let houseSizeParam = Object.values(houseSize).join(',')
    let houseIncomeParam = Object.values(houseIncome).join(',')

    let parsed = {
      ...(Object.keys(priceRange).length > 0 && { price_range__in: priceParam }),
      ...(Object.keys(floor).length > 0 && { floor__in: floorParam }),
      ...(Object.keys(construction).length > 0 && { contruction__in: constructionParam }),
      ...(Object.keys(style).length > 0 && { styles__style__in: styleParam }),
      ...(Object.keys(houseSize).length > 0 && { household_size__in: houseSizeParam }),
      ...(Object.keys(houseIncome).length > 0 && { household_income__in: houseIncomeParam }),
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}&page=1`
    })

    this.props.onPageLoad()
  }

  render() {
    const { listConstruction, listFloor, listPrice, listStyle, listHouseSize, listHouseIncome, 
            priceOld, constructionOld, floorOld, styleOld, houseSizeOld, houseIncomeOld} 
            = this.state
    return (
      <section className="side pc">
        <Form id="frm-search" >
          <div className="sidebar-search-choices">
            {/* list price */}
            <div className="sidebar-search-choices-inner">
                <div className="search-title">価格帯（価格）</div>
                  <FormGroup>
                    {listPrice.map((price, key) => (
                      <Label key={key}>
                        <Input 
                          className="choices-input" 
                          type="checkbox" 
                          name="priceRange" 
                          value={price.id} 
                          id={price.id} 
                          onChange={this.handleChange}
                          defaultChecked={priceOld.includes(price.id.toString())}
                        />
                        <span className="choices-parts">{price.title}</span>
                      </Label>
                    ))}
                  </FormGroup>
            </div>

            {/* listConstruction */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">構造 </div>
                <FormGroup>
                  {listConstruction.map((contruction, keyConstr) => (
                  <Label key={keyConstr}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="construction" 
                      value={contruction.id} 
                      id={contruction.id} 
                      onChange={this.handleChange}
                      defaultChecked={constructionOld.includes(contruction.id.toString())}
                    />
                    <span className="choices-parts">{contruction.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list floor */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">階数 </div>
                <FormGroup>
                  {listFloor.map((floor, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="floor" 
                      value={floor.id} 
                      id={floor.id} 
                      onChange={this.handleChange}
                      defaultChecked={floorOld.includes(floor.id.toString())}
                    />
                    <span className="choices-parts">{floor.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list style */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">テイスト </div>
                <FormGroup>
                  {listStyle.map((style, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input"
                      type="checkbox"
                      name="style"
                      value={style.id}
                      id={style.id}
                      onChange={this.handleChange}
                      defaultChecked={styleOld.includes(style.id.toString())}
                    />
                    <span className="choices-parts">{style.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list house hold size */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">世帯人数 </div>
                <FormGroup>
                  {listHouseSize.map((size, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="houseSize" 
                      value={size.id} 
                      id={size.id} 
                      onChange={this.handleChange}
                      defaultChecked={houseSizeOld.includes(size.id.toString())}
                    />
                    <span className="choices-parts">{size.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list house hold income */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">世帯年収 </div>
                <FormGroup>
                  {listHouseIncome.map((income, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="houseIncome" 
                      value={income.id} 
                      id={income.id} 
                      onChange={this.handleChange}
                      defaultChecked={houseIncomeOld.includes(income.id.toString())}
                    />
                    <span className="choices-parts">{income.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            <button 
              type="button" 
              onClick={this.handleResetForm} 
              className="sidebar-clear-btn btn clear-button"
            >
              入力値をリセット
            </button>
            <Button 
              type="button" 
              onClick={this.onClickSubmit} 
              className="sidebar-search-btn btn btn-default"
            >
              <i className="fa fa-search" />
              検索
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
  history: PropTypes.object,
  onPageLoad: PropTypes.func,
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AttributesSearchPC))
