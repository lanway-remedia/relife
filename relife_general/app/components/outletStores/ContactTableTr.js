import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import ContactTableTh from './ContactTableTh'
import { TextInput } from 'react-bootstrap4-form-validation'
import validator from 'validator'
class ContactTableTr extends React.Component {
  render () {
    let { title, name, placeholder, required, onChange } = this.props
    return (
      <div>

      <div className="contact_table_tr">
        <ContactTableTh title={title} required={required} />
        <div className="contact_table_td">
          <span className="contact_table_td_input">
            {
              name == 'email' ? (
                <TextInput 
                  type="email"
                  name={name}
                  placeholder={placeholder}
                  required
                  validator={validator.isEmail} 
                  errorMessage={{
                    validator: 'メールアドレスの形式が正しくないようです。'
                  }}
                  onChange={onChange}
                />
              ) : (
                <TextInput 
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  required
                  onChange={onChange}
                />
              )
            }
            
          </span>
        </div>
      </div>
      </div>
    )
  }
}

ContactTableTr.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
}

export default connect()(withRouter(ContactTableTr))
