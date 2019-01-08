import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import fbShare from '../../images/fb-share.png'
import twShare from '../../images/tw-share.png'
import ggShare from '../../images/gg-share.png'
import hatebuShare from '../../images/hatebu-share.png'
import rssShare from '../../images/rss-share.png'
import amebloShare from '../../images/ameblo-share.png'
import lineShare from '../../images/line-share.png'

class ShareHouse extends React.Component {
  render() {
    return (
      <div className="share-body cf">
        <div className="share-body-block">
          <Link to="/">
            <img src={fbShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={twShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={ggShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={hatebuShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={amebloShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={rssShare} />
          </Link>
        </div>
        <div className="share-body-block">
          <Link to="/">
            <img src={lineShare} />
          </Link>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(ShareHouse))
