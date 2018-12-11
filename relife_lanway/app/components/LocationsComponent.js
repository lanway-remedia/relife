import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Col, FormGroup, Label, Input } from 'reactstrap'
import { SelectGroup } from 'react-bootstrap4-form-validation'
import LocationActions from '../redux/wrapper/LocationsRedux'

class LocationsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataCity: [],
      dataDistrict: [],
      city: '',
      district: '',
      required: false
    }

    this.getLocation = this.getLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateDistrict = this.handleUpdateDistrict.bind(this)
    this.handleSendData = this.handleSendData.bind(this)
  }

  getLocation() {
    const id = 1 // Type City
    this.props.locationGetRequest(id)
  }

  componentDidMount() {
    if (
      Object.keys(this.props.outletStoresData).length === 0 ||
      Object.keys(this.props.exhibitionsData).length === 0
    ) {
      this.getLocation()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.outletStoresData !== nextProps.outletStoresData ||
      this.props.exhibitionsData !== nextProps.exhibitionsData
    ) {
      this.getLocation()
    }
    if (this.props.data !== nextProps.data) {
      let response = nextProps.data
      if (response.listLocation) {
        this.setState({
          dataCity: response.data
        })
      }
      if (nextProps.city) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === parseInt(nextProps.city)) {
            const dataDistrict = response.data[i].districts
            this.setState({
              dataDistrict: dataDistrict
            })
          }
        }
        this.setState({
          city: nextProps.city
        })
      }
      if (nextProps.district) {
        this.setState({
          district: nextProps.district
        })
      }
      if (nextProps.required) {
        this.setState({
          required: true
        })
      }
    }
  }

  componentWillUnmount() {
    this.getLocation()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSendData = () => {
    this.props.onSelectedCity(this.state.city)
    this.props.onSelectedDistrict(this.state.district)
  }

  handleUpdateDistrict = () => {
    const data = this.state

    if (data.city !== '0' && data.city !== '') {
      for (let i = 0; i < data.dataCity.length; i++) {
        if (data.dataCity[i].id === parseInt(data.city)) {
          const dataDistrict = data.dataCity[i].districts
          this.setState({
            dataDistrict: dataDistrict
          })
        }
      }
    }
  }

  render() {
    const { dataCity, dataDistrict, city, district, required } = this.state
    const isCity = city
    return (
      <React.Fragment>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for="city">{I18nUtils.t('city')}</Label>
            {required && (
              <SelectGroup
                type="select"
                name="city"
                id="city"
                onChange={this.handleChange}
                onMouseLeave={this.handleUpdateDistrict}
                value={city}
                required
                errorMessage={I18nUtils.t('lb-select')}
              >
                <option value="0">{I18nUtils.t('lb-select')}</option>
                {dataCity.map((city, key) => {
                  return (
                    <option key={key} value={city.id}>
                      {city.name}
                    </option>
                  )
                })}
              </SelectGroup>
            )}
            {!required && (
              <Input
                type="select"
                name="city"
                id="city"
                onChange={this.handleChange}
                onMouseLeave={this.handleUpdateDistrict}
                value={city}
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
            )}
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for="district">{I18nUtils.t('district')}</Label>
            {required && (
              <SelectGroup
                type="select"
                name="district"
                id="district"
                onChange={this.handleChange}
                value={district}
                required
                errorMessage={I18nUtils.t('lb-select')}
                onMouseLeave={this.handleSendData}
              >
                {isCity === '0' || isCity === '' ? (
                  <option value="0">{I18nUtils.t('lb-district')}</option>
                ) : (
                  <option value="0">{I18nUtils.t('lb-select')}</option>
                )}
                {dataDistrict.length > 0 &&
                  dataDistrict.map((dis, key) => {
                    return (
                      <option key={key} value={dis.id}>
                        {dis.name}
                      </option>
                    )
                  })}
              </SelectGroup>
            )}
            {!required && (
              <Input
                type="select"
                name="district"
                id="district"
                onChange={this.handleChange}
                value={district}
                onMouseLeave={this.handleSendData}
              >
                {isCity === '0' || isCity === '' ? (
                  <option value="0">{I18nUtils.t('lb-district')}</option>
                ) : (
                  <option value="0">{I18nUtils.t('lb-select')}</option>
                )}
                {dataDistrict.length > 0 &&
                  dataDistrict.map((dis, key) => {
                    return (
                      <option key={key} value={dis.id}>
                        {dis.name}
                      </option>
                    )
                  })}
              </Input>
            )}
          </FormGroup>
        </Col>
      </React.Fragment>
    )
  }
}

LocationsComponent.propTypes = {
  type: PropTypes.string,
  city: PropTypes.string,
  district: PropTypes.string,
  locationGetRequest: PropTypes.func,
  data: PropTypes.object,
  outletStoresData: PropTypes.object,
  exhibitionsData: PropTypes.object,
  required: PropTypes.bool,
  onSelectedCity: PropTypes.func,
  onSelectedDistrict: PropTypes.func,
  handleUpdateDistrict: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data,
    outletStoresData: state.outletStores.data,
    exhibitionsData: state.exhibitions.data
  }
}

const mapDispatchToProps = dispatch => ({
  locationGetRequest: data => dispatch(LocationActions.locationGetRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LocationsComponent))
