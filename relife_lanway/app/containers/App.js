/**
 * @author NamNH
 * App component: It is the top component relating to UI
 */

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import HotSwappingIntlProvider from '../containers/HotSwappingIntlProvider'
import LocaleComponent from '../utils/LocaleComponent'
import BootstrapModal from '../components/BootstrapModal'
import ErrorApi from '../components/ErrorApi'
import Routes from '../routes'

import '../styles/bootstrap.scss'
import '../styles/styles.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.basename = ''
    if (process.env.BASENAME) {
      this.basename = process.env.BASENAME
    }
  }

  render() {
    return (
      <HotSwappingIntlProvider>
        <Router basename={this.basename}>
          <div className="root-content">
            <LocaleComponent />
            <Routes />
            <BootstrapModal />
            <ErrorApi />
          </div>
        </Router>
      </HotSwappingIntlProvider>
    )
  }
}