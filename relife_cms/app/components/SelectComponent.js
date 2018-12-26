import React from 'react'
import { Col, FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import I18nUtils from '../../utils/I18nUtils'

const SelectComponent = ({ md, name, label, options, ...rest }) => {
  return (
    <Col xs="12" md={md}>
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Select
          className="react-select-ops"
          classNamePrefix="rs-cus"
          id={name}
          options={options}
          placeholder={I18nUtils.t('lb-select-vl')}
          {...rest}
        />
      </FormGroup>
    </Col>
  )
}

export default SelectComponent
