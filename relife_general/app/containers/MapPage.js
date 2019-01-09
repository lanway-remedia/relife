import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose'
import markerIcon from '../images/marker-icon.png'
class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      markers: [],
      // isOpen: false
    }
  }

  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join('')

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.photos })
      })
  }

  render() {
    const MapWithAMarkerClusterer = compose(
      withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCErDLuxN9CXZqXONdC7v6ghp6YX7qQ-vc&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `550px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
          const clickedMarkers = markerClusterer.getMarkers()
          console.log(`Current clicked markers length: ${clickedMarkers.length}`)
          console.log(clickedMarkers)
        },
      }),
      withStateHandlers(() => ({
        isOpen: false,
        infoIndex: null
      }), {
        showInfo: ({ isOpen, infoIndex }) => (index) => ({
          isOpen: infoIndex !== index || !isOpen,
          infoIndex: index
        })
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 35.823201, lng: 137.653148 }}
        mapTypeId="roadmap"
      >
        <MarkerClusterer
          onClick={props.onMarkerClustererClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {props.markers.map(marker => (
            <Marker
              key={marker.photo_id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={() => props.showInfo(marker.photo_id)}
              icon={markerIcon}
            >
            {(props.isOpen && props.infoIndex === marker.photo_id) && (
              <InfoWindow onCloseClick={this.showInfo}>
                <div className="info">
                  <Link to="">
                    <h3>{marker.photo_title}</h3>
                  </Link>
                </div>
              </InfoWindow>
            )}
            </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMap>
      )
    )
    return (
      <div id="map-container">
        <MapWithAMarkerClusterer markers={this.state.markers} />
      </div>
    )
  }
}
MapPage.propTypes = {
  onToggleOpen : PropTypes.func
}
export default connect()(withRouter(MapPage))
