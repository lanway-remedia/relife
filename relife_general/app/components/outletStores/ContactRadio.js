import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Radio } from 'react-bootstrap4-form-validation'
class ContactRadio extends React.Component {
  render() {
    let {name, data, onChange} = this.props

    return (
      <div className="contact_table_td">
      <Radio.RadioGroup 
        name={name} 
        required
        onChange={onChange}
      >
      {data.map((val, key) => (
        <Radio.RadioItem id={val.title} label={val.title} value={val.title} key={key} />
      ))}
      </Radio.RadioGroup>
      </div>
    )
  }
}

ContactRadio.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func
}
export default connect()(withRouter(ContactRadio))
