import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Col, FormGroup, Label, Input } from 'reactstrap'
import LocationActions from '../redux/wrapper/LocationsRedux'

class LocationsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataCity: [],
      dataDistrict: [],
      city: '',
      district: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const id = 1 // Type City
    this.props.locationsRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.listLocation) {
        this.setState({
          dataCity: response.data
        })
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { dataCity } = this.state
    console.log(dataCity)
    console.log(dataCity[0])
    // console.log(dataCity[5])
    return (
      <React.Fragment>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for={'city'}>{I18nUtils.t('city')}</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.handleChange}
            >
              <option value="0">{I18nUtils.t('lb-select')}</option>
              {dataCity.map((city, key) => {
                return (
                  <option key={key} value={city.id}>
                    {city.name}
                  </option>
                )
              })}
            </Input>
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for={'district'}>{I18nUtils.t('district')}</Label>
            <Input
              type="select"
              name="district"
              id="district"
              onChange={this.handleChange}
            >
              <option value="0">{I18nUtils.t('lb-select')}</option>
              {this.state.city === null ||
                (this.state.city === '' && (
                  <option value="0">Please select city</option>
                ))}
              {this.state.city !== null ||
                (this.state.city !== 0 &&
                  this.state.dataCity.districts[this.state.city].map(
                    (item, key) => (
                      <option key={key} value={item.id}>
                        {item.name}
                      </option>
                    )
                  ))}
              {/* {dataCity[0].districts.map((district, key) => {
                return (
                  <option key={key} value={district.id}>
                    {district.name}
                  </option>
                )
              })} */}
            </Input>
          </FormGroup>
        </Col>
      </React.Fragment>
    )
  }
}

LocationsComponent.propTypes = {
  type: PropTypes.string,
  locationsRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data
  }
}

const mapDispatchToProps = dispatch => ({
  locationsRequest: data => dispatch(LocationActions.locationsRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LocationsComponent))
