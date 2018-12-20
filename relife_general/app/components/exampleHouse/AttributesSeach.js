import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Label, Input, FormGroup } from 'reactstrap'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
class AttributesSeach extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listPrice: [],
      listConstruction: [],
      listFloor: [],
      listStyle: [],
      listHouseSize: [],
      listHouseIncome: [],
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

  render() {
    const { listConstruction, listFloor, listPrice, listStyle, listHouseSize, listHouseIncome } = this.state
    return (
      <section className="side pc">
        <Form>
          <div className="sidebar-search-choices">
            {/* list price */}
            <div className="sidebar-search-choices-inner">
                <div className="search-title">価格帯（価格）</div>
                  <FormGroup>
                    {listPrice.map((price, key) => (
                      <Label key={key}>
                        <Input className="choices-input" type="checkbox" name="price_range[]" value="" id={price.id} />
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
                    <Input className="choices-input" type="checkbox" name="contruction[]" value={contruction.title} id={contruction.id} />
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
                    <Input className="choices-input" type="checkbox" name="contruction[]" value={floor.title} id={floor.id} />
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

            <button name="action" value="clear" type="button" className="sidebar-clear-btn btn clear-button">
              入力値をリセット
            </button>
            <button type="button" className="sidebar-search-btn btn btn-default">
              <i className="fa fa-search" />
              検索
            </button>
          </div>
        </Form>
      </section>
    )
  }
}

AttributesSeach.propTypes = {
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributePriceListRequest: PropTypes.func,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
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
)(withRouter(AttributesSeach))
