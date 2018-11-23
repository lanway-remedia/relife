import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Col, FormGroup, Label, Input } from 'reactstrap'

class LocationsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Col xs="12" md="6">
        <FormGroup>
          <Label for={'filterDistrict'}>{I18nUtils.t('district')}</Label>
          <Input type="select" name="filterDistrict" id="filterDistrict">
            <option value="">{I18nUtils.t('lb-select')}</option>
            <option value="">{I18nUtils.t('lb-enable')}</option>
            <option value="">{I18nUtils.t('lb-disabled')}</option>
          </Input>
        </FormGroup>
      </Col>
    )
  }
}

LocationsComponent.propTypes = {
  type: PropTypes.string
}

export default connect()(withRouter(LocationsComponent))
