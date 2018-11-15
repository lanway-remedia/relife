import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

class TableBodyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    let { tdBodyArray } = this.props
    return (
      <tbody>
        {tdBodyArray.map((title, key) => {
          return (
            <tr key={key}>
              {title.map((title, key) => {
                return <td key={key}>{title}</td>
              })}
              <td>
                <Button
                  title={I18nUtils.t('edit')}
                  color="primary"
                  outline
                  size="sm"
                  className="btn-act"
                >
                  <i className="fa fa-edit" />
                </Button>
                <Button
                  title={I18nUtils.t('delete')}
                  color="danger"
                  outline
                  size="sm"
                  className="btn-act"
                >
                  <i className="fa fa-trash" />
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}

TableBodyComponent.propTypes = {
  tdBodyArray: PropTypes.array
}

export default connect()(withRouter(TableBodyComponent))
