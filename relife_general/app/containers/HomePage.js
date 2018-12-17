/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container} from 'reactstrap'
import BackGround from '../components/BackGround'
import ExampleHouseList from '../components/ExampleHouseList'
import TopMap from '../components/TopMap'
import 'font-awesome/css/font-awesome.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return [
            <BackGround key="1" />,
            // <TopMap key="2" />,
            <Container key="2">
                <ExampleHouseList />
            </Container>,

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
