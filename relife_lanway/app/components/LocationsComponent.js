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
      dataRegion: [],
      dataCity: [],
      region: '',
      city: '',
      required: false
    }

    this.getLocation = this.getLocation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleUpdateCity = this.handleUpdateCity.bind(this)
    this.handleSendData = this.handleSendData.bind(this)
  }

  getLocation() {
    const id = 1 // Type Region
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
          dataRegion: response.data
        })
      }
      if (nextProps.region) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === parseInt(nextProps.region)) {
            const dataCity = response.data[i].cities
            this.setState({
              dataCity: dataCity
            })
          }
        }
        this.setState({
          region: nextProps.region
        })
      }
      if (nextProps.city) {
        this.setState({
          city: nextProps.city
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
    this.props.onSelectedRegion(this.state.region)
    this.props.onSelectedCity(this.state.city)
  }

  handleUpdateCity = () => {
    const data = this.state

    if (data.region !== '') {
      for (let i = 0; i < data.dataRegion.length; i++) {
        if (data.dataRegion[i].id === parseInt(data.region)) {
          const dataCity = data.dataRegion[i].cities
          this.setState({
            dataCity: dataCity
          })
        }
      }
    }
  }

  render() {
    const { dataRegion, dataCity, region, city, required } = this.state
    const isRegion = region
    return (
      <React.Fragment>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for="region">{I18nUtils.t('region')}</Label>
            {required && (
              <SelectGroup
                type="select"
                name="region"
                id="region"
                onChange={this.handleChange}
                onMouseLeave={this.handleUpdateCity}
                value={region}
                required={required}
                errorMessage={I18nUtils.t('lb-select')}
              >
                <option value="">{I18nUtils.t('lb-select')}</option>
                {dataRegion.map((region, key) => {
                  return (
                    <option key={key} value={region.id}>
                      {region.name}
                    </option>
                  )
                })}
              </SelectGroup>
            )}
            {!required && (
              <Input
                type="select"
                name="region"
                id="region"
                onChange={this.handleChange}
                onMouseLeave={this.handleUpdateCity}
                value={region}
              >
                <option value="">{I18nUtils.t('lb-select')}</option>
                {dataRegion.map((region, key) => {
                  return (
                    <option key={key} value={region.id}>
                      {region.name}
                    </option>
                  )
                })}
              </Input>
            )}
          </FormGroup>
        </Col>
        <Col xs="12" md="6">
          <FormGroup>
            <Label for="city">{I18nUtils.t('city')}</Label>
            {required && (
              <SelectGroup
                type="select"
                name="city"
                id="city"
                onChange={this.handleChange}
                value={city}
                required={required}
                errorMessage={I18nUtils.t('lb-select')}
                onMouseLeave={this.handleSendData}
              >
                {isRegion === '' ? (
                  <option value="">{I18nUtils.t('lb-city')}</option>
                ) : (
                  <option value="">{I18nUtils.t('lb-select')}</option>
                )}
                {dataCity.length > 0 &&
                  dataCity.map((dis, key) => {
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
                name="city"
                id="city"
                onChange={this.handleChange}
                value={city}
                onMouseLeave={this.handleSendData}
              >
                {isRegion === '' ? (
                  <option value="">{I18nUtils.t('lb-city')}</option>
                ) : (
                  <option value="">{I18nUtils.t('lb-select')}</option>
                )}
                {dataCity.length > 0 &&
                  dataCity.map((dis, key) => {
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
  region: PropTypes.string,
  city: PropTypes.string,
  locationGetRequest: PropTypes.func,
  data: PropTypes.object,
  outletStoresData: PropTypes.object,
  exhibitionsData: PropTypes.object,
  required: PropTypes.bool,
  onSelectedRegion: PropTypes.func,
  onSelectedCity: PropTypes.func,
  handleUpdateCity: PropTypes.func
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
