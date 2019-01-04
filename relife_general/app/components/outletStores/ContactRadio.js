import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Radio } from 'react-bootstrap4-form-validation'
import { Input } from 'reactstrap'
class ContactRadio extends React.Component {
  render() {
    let {name, data, onChange, showAddress, value} = this.props

    return (
      <div className="contact_table_td">
        <Radio.RadioGroup 
          name={name} 
          required
          onChange={onChange}
          valueSelected={value}
        >
        {data.map((val, key) => (
          <Radio.RadioItem 
            id={val.title} 
            label={val.title} 
            value={val.id.toString()} 
            key={key} 
          />
        ))}
        </Radio.RadioGroup>
        {showAddress && (
          <Input
            type="text"
            name="construction_position"
            placeholder="予定地の住所を入力してください"
            onChange={onChange}
          />
        )}
      </div>
    )
  }
}

ContactRadio.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  showAddress: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
}
export default connect()(withRouter(ContactRadio))
