/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {} from 'reactstrap'

class BackGround extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="back-ground" />
        )
    }
}

BackGround.propTypes = {}

export default connect()(withRouter(BackGround))
