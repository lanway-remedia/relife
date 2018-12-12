/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {} from 'reactstrap'
import m1 from '../images/m1.jpg'
import m2 from '../images/m2.jpg'
import m3 from '../images/m3.jpg'
import m4 from '../images/m4.jpg'
import m5 from '../images/m5.jpg'
import m6 from '../images/m6.jpg'
import m7 from '../images/m7.jpg'
import m8 from '../images/m8.jpg'
import m9 from '../images/m9.jpg'

class BackGround extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let items = [m1, m2, m3, m4, m5, m6, m7, m8, m9]
        let item = items[Math.floor(Math.random()*items.length)]
        return (
            <div className="back-ground" style={{backgroundImage: `url(${item})`}} />
        )
    }
}

BackGround.propTypes = {}

export default connect()(withRouter(BackGround))
