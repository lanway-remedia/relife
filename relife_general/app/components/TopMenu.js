/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import {  } from 'reactstrap'

class TopMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="/register" >Đăng Nhập</a>
                    </li>
                </ul>
            </div>
        )
    }
}

TopMenu.propTypes = {

}

export default connect()(withRouter(TopMenu))
