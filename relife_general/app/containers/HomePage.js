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
import CoWorkingList from '../components/CoWorkingList'
import TopMenu from '../components/TopMenu'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return [
            <TopMenu key={1} />,
            <BackGround key="1" />,
            <Container key="2">
                <CoWorkingList />
            </Container>
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
