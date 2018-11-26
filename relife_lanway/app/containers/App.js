/**
 * @author NamNH
 * App component: It is the top component relating to UI
 */

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import HotSwappingIntlProvider from '../containers/HotSwappingIntlProvider'
import LocaleComponent from '../utils/LocaleComponent'
import CommonModal from '../components/CommonModal'
import CommonApi from '../components/CommonApi'
import Routes from '../routes'
import user from '../images/user.png'
import '../styles/bootstrap.scss'
import '../styles/styles.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.basename = ''
    if (process.env.BASENAME) {
      this.basename = process.env.BASENAME
    }
    this.state = {
      userimage: user,
      username: ''
    }
  }

  getProfile = (profile) => {
    if (this.state.userimage != profile.profile_image) {
      this.setState({
        userimage: profile.profile_image
      })
    }
    if (this.state.username != profile.username) {
      this.setState({
        username: profile.username
      })
    }
  }

  render() {
    let { username, userimage } = this.state
    return (
      <HotSwappingIntlProvider>
        <Router basename={this.basename}>
          <div className="root-content">
            <LocaleComponent />
            <Routes username={username} userimage={userimage} />
            <CommonModal />
            <CommonApi getProfile={profile => this.getProfile(profile)} />
          </div>
        </Router>
      </HotSwappingIntlProvider>
    )
  }
}
