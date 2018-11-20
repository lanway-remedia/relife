/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

class ImageUploadComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleOpenFileUp = this.handleOpenFileUp.bind(this)
  }

  handleImageChange(e) {
    this.props.onImageChange(e.currentTarget.files[0])
  }

  handleOpenFileUp = () => {
    this.inputElement.click()
  }

  render() {
    let { imageUpload, size, uploadTitle } = this.props
    return (
      <div className="upload-container upload-image">
        {!imageUpload ? (
          <div
            className="upload-icon"
            style={{
              width: `${size}px`,
              height: `${size}px`
            }}
          >
            <label id="uploader-icon" style={{ lineHeight: `${size - 6}px` }}>
              <span className="fa fa-file-image-o fa-2x" />
            </label>
            <Button
              color="primary"
              outline
              size="sm"
              onClick={this.handleOpenFileUp}
            >
              {I18nUtils.t('btn-choose-img')}
            </Button>
            <span className="upload-title">{uploadTitle}</span>
            <input
              type="file"
              id="upload-icon"
              accept="image/*"
              ref={input => (this.inputElement = input)}
              onChange={this.handleImageChange}
            />
          </div>
        ) : (
          <div
            className="upload-icon"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: `${size / 2}px`
            }}
          >
            <label htmlFor="upload-icon">
              <img
                src={
                  typeof imageUpload == 'string'
                    ? imageUpload
                    : URL.createObjectURL(imageUpload)
                }
                style={{
                  width: `${size - 2}px`,
                  height: `${size - 2}px`
                }}
              />
            </label>
            <Button
              color="primary"
              outline
              size="sm"
              onClick={this.handleOpenFileUp}
            >
              {I18nUtils.t('btn-choose-img')}
            </Button>
            <span className="upload-title">{uploadTitle}</span>
            <input
              type="file"
              id="upload-icon"
              accept="image/*"
              ref={input => (this.inputElement = input)}
              onChange={this.handleImageChange}
            />
          </div>
        )}
      </div>
    )
  }
}

ImageUploadComponent.propTypes = {
  imageUpload: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  uploadTitle: PropTypes.string,
  size: PropTypes.number,
  onImageChange: PropTypes.func
}

export default connect()(withRouter(ImageUploadComponent))
