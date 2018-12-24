/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap'
// import I18nUtils from '../utils/I18nUtils'

class ExampleHouseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spaces: [
                {
                    image: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
                    title: 'Card title',
                    subTitle: 'Card subtitle',
                    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                },
                {
                    image: 'https://www.sample-videos.com/img/Sample-jpg-image-200kb.jpg',
                    title: 'Card title',
                    subTitle: 'Card subtitle',
                    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                },
                {
                    image: 'http://images.unsplash.com/photo-1519114056088-b877fe073a5e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9&s=9cc8aa3264c184ae90909f9501d284a7',
                    title: 'Card title',
                    subTitle: 'Card subtitle',
                    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                }
            ]
        }
    }

  render() {
    let { spaces } = this.state
    return (
      <div className="space-list">
        <Row>
          {spaces && spaces.map((item, index) => (
            <Col xs="12" md="4" key={index}>
              <Card>
                <CardImg top className="card-img" src={item.image} />
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardSubtitle>{item.subTitle}</CardSubtitle>
                  <CardText>{item.content}</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

ExampleHouseList.propTypes = {
    history: PropTypes.object,
}

export default connect()(withRouter(ExampleHouseList))
