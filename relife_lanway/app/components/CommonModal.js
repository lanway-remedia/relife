import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../constants'
import I18nUtils from '../utils/I18nUtils'

class CommonModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    headerClass: PropTypes.string,
    bodyClass: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
    okFunction: PropTypes.func,
    closeFunction: PropTypes.func
  }

  render() {
    let {
      show,
      headerClass,
      bodyClass,
      title,
      message,
      handleHide,
      okFunction,
      closeFunction
    } = this.props
    title = !title ? I18nUtils.t(DefaultValue.MODAL_NAME) : title

    return (
      <Modal isOpen={show}>
        {title && <ModalHeader className={headerClass}>{title}</ModalHeader>}
        <ModalBody className={bodyClass}>{message}</ModalBody>
        <ModalFooter>
          {okFunction && (
            <div>
              <Button color="danger" onClick={okFunction}>
                {I18nUtils.t('ok')}
              </Button>
              <Button color="primary" onClick={handleHide}>
                {I18nUtils.t('cancel')}
              </Button>
            </div>
          )}
          {closeFunction && (
            <Button color="primary" onClick={closeFunction}>
              {I18nUtils.t('close')}
            </Button>
          )}
          {(!okFunction && !closeFunction) && (
            <Button color="primary" onClick={handleHide}>
              {I18nUtils.t('close')}
            </Button>
          )}
        </ModalFooter>
      </Modal>
    )
  }
}

export default connectModal({ name: ModalName.COMMON })(CommonModal)
