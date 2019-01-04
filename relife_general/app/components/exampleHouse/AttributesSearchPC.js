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

      priceRange: [],
      construction: [],
      floor: [],
      style: [],
      houseSize: [],
      houseIncome: [],
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
    this.props.history.push({
      search: `?page=1` 
    })

    this.setState({
      priceRange: [],
      construction: [],
      floor: [],
      style: [],
      houseSize: [],
      houseIncome: [],
    })
    document.getElementById('frm-search-pc').reset()
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

    this.setState({
      priceRange: priceParams ? priceParams.split(',') : [],
      floor: floorParams ? floorParams.split(',') : [],
      construction: constructionParams ? constructionParams.split(',') : [],
      style: styleParams ? styleParams.split(',') : [],
      houseSize: houseSizeParams ? houseSizeParams.split(',') : [],
      houseIncome: houseIncomeParams ? houseIncomeParams.split(',') : [],
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

    if (isChecked === false) {
      itemChecked = itemChecked.filter(item => item !== value)
    } else {
      itemChecked.push(value)
    }
    console.log(itemChecked)
    this.setState({
      [e.target.name] : itemChecked
    })
  }

  onClickSubmit = () => {
    let {priceRange, floor, construction, style, houseSize, houseIncome} = this.state
    let priceParam = priceRange.join(',')
    let floorParam = floor.join(',')
    let constructionParam = construction.join(',')
    let styleParam = style.join(',')
    let houseSizeParam = houseSize.join(',')
    let houseIncomeParam = houseIncome.join(',')
    let parsed = {
      ...(priceRange.length > 0 && { price_range__in: priceParam }),
      ...(floor.length > 0 && { floor__in: floorParam }),
      ...(construction.length > 0 && { contruction__in: constructionParam }),
      ...(style > 0 && { styles__style__in: styleParam }),
      ...(houseSize.length > 0 && { household_size__in: houseSizeParam }),
      ...(houseIncome.length > 0 && { household_income__in: houseIncomeParam }),
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}&page=1`
    })

    this.props.onPageLoad()
  }

  render() {
    const { listConstruction, listFloor, listPrice, listStyle, listHouseSize, listHouseIncome, 
            priceRange, floor, construction, style, houseSize, houseIncome
          } = this.state
    return (
      <section className="side pc">
        <Form id="frm-search-pc" >
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
                          defaultChecked={priceRange.includes(price.id.toString())}
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
                  {listConstruction.map((val, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="construction" 
                      value={val.id} 
                      id={val.id} 
                      onChange={this.handleChange}
                      defaultChecked={construction.includes(val.id.toString())}
                    />
                    <span className="choices-parts">{val.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list floor */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">階数 </div>
                <FormGroup>
                  {listFloor.map((val, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="floor" 
                      value={val.id} 
                      id={val.id} 
                      onChange={this.handleChange}
                      defaultChecked={floor.includes(val.id.toString())}
                    />
                    <span className="choices-parts">{val.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list style */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">テイスト </div>
                <FormGroup>
                  {listStyle.map((val, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input"
                      type="checkbox"
                      name="style"
                      value={val.id}
                      id={val.id}
                      onChange={this.handleChange}
                      defaultChecked={style.includes(val.id.toString())}
                    />
                    <span className="choices-parts">{val.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list house hold size */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">世帯人数 </div>
                <FormGroup>
                  {listHouseSize.map((val, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="houseSize" 
                      value={val.id} 
                      id={val.id} 
                      onChange={this.handleChange}
                      defaultChecked={houseSize.includes(val.id.toString())}
                    />
                    <span className="choices-parts">{val.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            {/* list house hold income */}
            <div className="sidebar-search-choices-inner">
              <div className="search-title">世帯年収 </div>
                <FormGroup>
                  {listHouseIncome.map((val, key) => (
                  <Label key={key}>
                    <Input 
                      className="choices-input" 
                      type="checkbox" 
                      name="houseIncome" 
                      value={val.id} 
                      id={val.id} 
                      onChange={this.handleChange}
                      defaultChecked={houseIncome.includes(val.id.toString())}
                    />
                    <span className="choices-parts">{val.title}</span>
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
