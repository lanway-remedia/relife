/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import BackGround from '../components/home/BackGround'
import 'font-awesome/css/font-awesome.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return [
            <BackGround key="1" />
        ]
    }
}

HomePage.propTypes = {
    history: PropTypes.object,
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = () => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HomePage))