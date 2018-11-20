import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../constants'
import I18nUtils from '../utils/I18nUtils'

class CommonModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
    okFunc: PropTypes.func,
  }

  render() {
    let { show, title, message, handleHide, okFunc } = this.props
    title = !title ? I18nUtils.t(DefaultValue.MODAL_NAME) : title
    return (
      <Modal isOpen={show}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>Close</Button>
          {okFunc && <Button color="danger" onClick={okFunc}>OK</Button>}
        </ModalFooter>
      </Modal>
    )
  }
}

export default connectModal({ name: ModalName.COMMON })(CommonModal)