import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../constants'
import I18nUtils from '../utils/I18nUtils'
// import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'

class FormModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.handleHide = this.handleHide.bind(this)
  }

  handleHide = () => {
    this.hide(ModalName.FORMMODAL)
  }

  // handleChange = (e) =>{
  //   this.setState)
  // }

  render() {
    let {
      show,
      modalClass,
      headerClass,
      bodyClass,
      title,
      message,
      saveFunction,
      handleHide,
      hideButton
    } = this.props
    title = !title ? I18nUtils.t(DefaultValue.MODAL_NAME) : title

    return (
      <Modal isOpen={show} className={modalClass}>
        {title && <ModalHeader className={headerClass}>{title}</ModalHeader>}
        <ModalBody className={bodyClass}>{message}</ModalBody>
        {hideButton && (
          <ModalFooter>
            {saveFunction && (
              <div>
                <Button className="mr-2" color="success" onClick={saveFunction}>
                  {I18nUtils.t('save')}
                </Button>{' '}
                <Button color="danger" onClick={handleHide}>
                  {I18nUtils.t('cancel')}
                </Button>
              </div>
            )}
          </ModalFooter>
        )}
      </Modal>
    )
  }
}

FormModal.propTypes = {
  show: PropTypes.bool,
  modalClass: PropTypes.string,
  headerClass: PropTypes.string,
  bodyClass: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  saveFunction: PropTypes.func,
  handleHide: PropTypes.func,
  hideButton: PropTypes.bool
}

export default connectModal({ name: ModalName.FORMMODAL })(FormModal)
