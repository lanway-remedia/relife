/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import BackGround from '../components/home/BackGround'
import ExampleHouseList from '../components/home/ExampleHouseList'
import SliderKeyword from '../components/home/SliderKeyword'
import TopMap from '../components/home/TopMap'
import 'font-awesome/css/font-awesome.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return [
            <BackGround key="1" />,
            <TopMap key="2" />,
            <ExampleHouseList key="3" />,
            <SliderKeyword key="4" />
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
