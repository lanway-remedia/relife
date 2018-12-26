import React, { Component } from 'react'
import InputComponent from './InputComponent'
import SelectComponent from './SelectComponent'

class FormComponent extends Component {
  state = {
    data: {},
    errors: {}
  }

  handleSubmitForm = e => {
    e.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return
    this.doSubmit()
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data, errors })
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    )
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state

    return (
      <InputComponent
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state
    return (
      <SelectComponent
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }
}

export default FormComponent
