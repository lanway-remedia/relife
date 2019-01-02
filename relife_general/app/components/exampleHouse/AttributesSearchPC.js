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

      price_range: {},
      construction: {},
      floor: {},
      household_size: '',
      household_income: '',
      style: ''

    }
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
  }

  handleChange = (e) => {
    const name = e.target.name
    let itemChecked
    if (name == 'price_range') {
      itemChecked = this.state.price_range
    } else if (name == 'construction') {
      itemChecked = this.state.construction
    } else if (name == 'floor') {
      itemChecked = this.state.floor
    }
    const value = e.target.value
    const isChecked = e.target.checked

    itemChecked[value] = isChecked
    this.setState({
      [e.target.name] : itemChecked
    })
  }

  onClickSubmit = () => {
    let {price_range, floor, construction} = this.state

    let arrPrice = []
    for(let key in price_range) {
      if (price_range[key] == true) {
        arrPrice.push(key)
      }
    }

    let arrFloor = []
    for(let key in floor) {
      if (floor[key] == true) {
        arrFloor.push(key)
      }
    }

    let arrConstruction = []
    for(let key in construction) {
      if (construction[key] == true) {
        arrConstruction.push(key)
      }
    }

    let parsed = {
      ...(arrPrice.length > 0 && { price_range__in: arrPrice.join() }),
      ...(arrFloor.length > 0 && { floor__in: arrFloor.join() }),
      ...(arrConstruction.length > 0 && { contruction__in: arrConstruction.join() }),
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}`
    })

    this.props.onPageLoad()
  }

  render() {
    const { listConstruction, listFloor, listPrice, listStyle, listHouseSize, listHouseIncome } = this.state
    return (
      <section className="side pc">
        <Form 
          id="frm-search"
        >
          <div className="sidebar-search-choices">
            {/* list price */}
            <div className="sidebar-search-choices-inner">
                <div className="search-title">価格帯（価格）</div>
                  <FormGroup>
                    {listPrice.map((price, key) => (
                      <Label key={key}>
                        <Input className="choices-input" type="checkbox" name="price_range" value={price.id} id={price.id} onChange={this.handleChange} />
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
                    <Input className="choices-input" type="checkbox" name="construction" value={contruction.id} id={contruction.id} onChange={this.handleChange} />
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
                    <Input className="choices-input" type="checkbox" name="floor" value={floor.id} id={floor.id} onChange={this.handleChange} />
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
                    <Input className="choices-input" type="checkbox" name="contruction[]" value={style.title} id={style.id} />
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
                    <Input className="choices-input" type="checkbox" name="contruction[]" value={size.title} id={size.id} />
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
                    <Input className="choices-input" type="checkbox" name="contruction[]" value={income.title} id={income.id} />
                    <span className="choices-parts">{income.title}</span>
                  </Label>
                  ))}
                </FormGroup>
            </div>

            <button type="button" onClick={this.handleResetForm} className="sidebar-clear-btn btn clear-button">
              入力値をリセット
            </button>
            <Button type="button" onClick={this.onClickSubmit} className="sidebar-search-btn btn btn-default">
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
