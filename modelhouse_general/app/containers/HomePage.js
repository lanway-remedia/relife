/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import BackGround from '../components/home/BackGround'
import TopMap from '../components/home/TopMap'
import ModelHousesHome from '../components/home/ModelHousesHome'
import ExhibitionsHome from '../components/home/ExhibitionsHome'
import ExhibitionsTabs from '../components/home/ExhibitionsTabs'
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
            <ModelHousesHome key="3" />,
            <ExhibitionsHome key="4" />,
            <ExhibitionsTabs key="5" />,
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
