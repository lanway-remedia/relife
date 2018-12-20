/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  FormGroup, Label, Input
} from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

class CustomFormGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  inputRefFocus = () => {
    this.inputRef.disabled = false
    this.inputRef.focus()
  }

  onChangeField = e => {
    this.setState({
      value: e.target.value
    })
  }

  onBlurField = () => {
    this.inputRef.disabled = true
    this.props.onBlurField(this.state.value)
  }

  render() {
    let { value } = this.state
    let { fieldName, fieldText } = this.props
    return (
      <FormGroup>
        <Label for={fieldName}>{fieldText}</Label>
        <Input
          disabled
          innerRef={comp => this.inputRef = comp}
          type="text"
          value={value}
          name={fieldName}
          id={fieldName}
          onChange={e => this.onChangeField(e)}
          onBlur={() => this.onBlurField()}
        />
        <span onClick={() => this.inputRefFocus()}>{I18nUtils.t('edit')}</span>
      </FormGroup>
    )
  }
}

CustomFormGroup.defaultProps = {
  type: 'text'
}

CustomFormGroup.propTypes = {
  fieldName: PropTypes.string,
  fieldText: PropTypes.string,
  type: PropTypes.string,
  onBlurField: PropTypes.func,
  value: PropTypes.string
}

export default connect()(withRouter(CustomFormGroup))
