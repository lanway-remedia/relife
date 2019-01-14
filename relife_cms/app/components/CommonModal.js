import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connectModal } from 'redux-modal'
import { ModalName, DefaultValue } from '../constants'
import I18nUtils from '../utils/I18nUtils'

class CommonModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    modalClass: PropTypes.string,
    headerClass: PropTypes.string,
    bodyClass: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired
    ]),
    handleHide: PropTypes.func.isRequired,
    okFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    closeFunction: PropTypes.func
  }

  render() {
    let {
      show,
      modalClass,
      headerClass,
      bodyClass,
      title,
      message,
      handleHide,
      okFunction,
      closeFunction,
      deleteFunction
    } = this.props
    title = !title ? I18nUtils.t(DefaultValue.MODAL_NAME) : title

    return (
      <Modal isOpen={show} className={modalClass}>
        {title && <ModalHeader className={headerClass}>{title}</ModalHeader>}
        <ModalBody className={bodyClass}>
          <div className="message-body">{message}</div>

          {okFunction && (
            <div className="modal-btns">
              <Button color="secondary" onClick={okFunction}>
                {I18nUtils.t('ok')}
              </Button>
              <Button color="success" onClick={handleHide}>
                {I18nUtils.t('cancel')}
              </Button>
            </div>
          )}
          {deleteFunction && (
            <div className="modal-btns">
              <Button color="secondary" onClick={deleteFunction}>
                {I18nUtils.t('delete')}
              </Button>
              <Button color="success" onClick={handleHide}>
                {I18nUtils.t('cancel')}
              </Button>
            </div>
          )}
          {closeFunction && (
            <div className="modal-btns">
              <Button color="success" onClick={closeFunction}>
                {I18nUtils.t('close')}
              </Button>
            </div>
          )}
          {!okFunction && !closeFunction && !deleteFunction && (
            <div className="modal-btns">
              <Button color="success" onClick={handleHide}>
                {I18nUtils.t('close')}
              </Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    )
  }
}

export default connectModal({ name: ModalName.COMMON })(CommonModal)
