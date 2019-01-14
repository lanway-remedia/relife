/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { Form, Input, Button } from 'reactstrap'
import {} from 'reactstrap'
import m1 from '../../images/m1.jpg'
import m2 from '../../images/m2.jpg'
import m3 from '../../images/m3.jpg'
import m4 from '../../images/m4.jpg'
import m5 from '../../images/m5.jpg'
import m6 from '../../images/m6.jpg'
import m7 from '../../images/m7.jpg'
import m8 from '../../images/m8.jpg'
import m9 from '../../images/m9.jpg'
import logo from '../../images/logo.png'
class BackGround extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleSubmit = () => {

    }

    render() {
        let items = [m1, m2, m3, m4, m5, m6, m7, m8, m9]
        let item = items[Math.floor(Math.random()*items.length)]
        return (
            <div className="back-ground" style={{backgroundImage: `url(${item})`}}>
                <div className="mainvisual-message">
                    <h1>
                    <img src={logo}
                        alt="logo" 
                        width="100%"
                    />
                    </h1>
                    <p className="mainvisual-title">いい家。いい工務店。</p>
                    <p className="mainvisual-text">思い描いた素敵住まいのために
                    <br />暮らしづくりのコンシェルジュ
                    </p>
                    <Link to="" className="mainvisual-message-link">Re:Lifeとは</Link>
                </div>
                <div className="mainvisual-search">
                    <Form>
                        <Input 
                            type="text"
                            name="place"
                            className="search-place"
                            placeholder="地域"
                        />
                        <Input 
                            type="text"
                            name="keyword"
                            className="search-keyword"
                            placeholder="フリーワード"
                        />
                        <Button className="btn btn-default">
                            <i className="fa fa-search" aria-hidden="true" />
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

BackGround.propTypes = {}

export default connect()(withRouter(BackGround))
