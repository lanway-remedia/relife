import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PageTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        intervalId: 0
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', function() {
      document.getElementById('pagetop').hidden = (pageYOffset < 150)
    })
  }

  scrollStep = () => {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId)
    }
    window.scroll(0, window.pageYOffset - 50)
  }
  
  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep.bind(this), 16.66)
    this.setState({ intervalId: intervalId })
  }
  render() {
    return (
      <div className="pagetop" id="pagetop" hidden>
        <span onClick = {() => { this.scrollToTop() }}>PAGE TOP</span>
      </div>
    )
  }
}

export default connect()(withRouter(PageTop))
