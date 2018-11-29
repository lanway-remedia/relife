/**
 * @author NamNH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js'

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css'

import FroalaEditor from 'react-froala-wysiwyg'

class ArticlePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: ''
    }
    this.handleModelChange = this.handleModelChange.bind(this)
  }

  componentDidMount() {

  }

  handleModelChange(model) {
    this.setState({
      model
    })
  }

  render() {
    const config = {
      imageUploadURL: 'http://18.179.32.241/api/file-managements/v1/upload/',
      imageUploadMethod: 'POST',
      events: {
        'froalaEditor.image.uploaded': (e, editor, response) => {
          response = JSON.parse(response)
          editor.image.insert(response.data.url, true, null, editor.image.get(), null)
          return false
        }
      }
    }

    return (
      <div className="app">
        <div className="article-page">
          <FroalaEditor
            model={this.state.model}
            onModelChange={this.handleModelChange}
            config={config}
          />
        </div>
      </div>
    )
  }
}

ArticlePage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ArticlePage))
