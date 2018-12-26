import React from 'react'
import { Col, FormGroup, Label, Input } from 'reactstrap'

const InputComponent = ({ md, name, label, ...rest }) => {
  return (
    <Col xs="12" md={md}>
      <FormGroup>
        <Label for={name}>{label}</Label>
        <Input {...rest} type="text" name={name} id={name} />
      </FormGroup>
    </Col>
  )
}

export default InputComponent
