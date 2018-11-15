import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../constants'
import I18nUtils from '../utils/I18nUtils'

class BootstrapModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
    okFunction: PropTypes.func,
  }

  render() {
    let { show, title, message, handleHide, okFunction } = this.props
    title = !title ? I18nUtils.t(DefaultValue.MODAL_NAME) : title
    return (
      <Modal isOpen={show}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>Close</Button>
          {okFunction && <Button color="danger" onClick={okFunction}>Save changes</Button>}
        </ModalFooter>
      </Modal>
    )
  }
}

export default connectModal({ name: ModalName.COMMON })(BootstrapModal)
