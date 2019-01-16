import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { compose, withProps, withHandlers, withStateHandlers } from 'recompose'
import markerIcon from '../../images/marker-icon.png'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import m1 from '../../images/m1.png'
import m2 from '../../images/m2.png'
import m3 from '../../images/m3.png'
import m4 from '../../images/m4.png'
import m5 from '../../images/m5.png'
class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      markers: [],
      storeList: [],
    }
    this.getStoreList = this.getStoreList.bind(this)
  }

  getStoreList = () => {
    let data = {
      offset: '',
      limit: '',
    }
    this.props.outletStoresListRequest(data)
  }

  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListStores) {
        this.setState({
          storeList: response.data
        })
      }
    }
  }

  componentDidMount() {
    this.getStoreList()
  }

  render() {
    const {storeList} = this.state
    // let latCenter = 35.823201 
    // let lngCenter = 137.653148
    // if (storeList[0]) {
    //   latCenter = storeList[0].latitude
    //   lngCenter = storeList[0].longitude
    // }

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
          styles={[
            {
              url: m1,
              textColor: 'white',
              height: 53,
              width: 53
            },
            {
              url: m2,
              textColor: 'white',
              width: 56,
              height: 56,
            },
            {
              url: m3,
              textColor: 'white',
              height: 66,
              width: 66
            },
            {
              url: m4,
              textColor: 'white',
              height: 78,
              width: 78
            },
            {
              url: m5,
              textColor: 'white',
              height: 90,
              width: 90
            }
          ]}
        >
          {props.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onClick={() => props.showInfo(marker.id)}
              icon={markerIcon}
            >
            {(props.isOpen && props.infoIndex === marker.id) && (
              <InfoWindow onCloseClick={this.showInfo}>
                <div className="info">
                  <Link to={`/builder/${marker.id}`}>
                    <h3>{marker.title}</h3>
                  </Link>
                  {marker.address}
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
        <MapWithAMarkerClusterer markers={storeList} />
      </div>
    )
  }
}

MapPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  dataLocation: PropTypes.object,
  outletStoresListRequest: PropTypes.func,
  locationListRequest : PropTypes.func,
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data,
  }
}

const mapDispatchToProps = dispatch => ({
  outletStoresListRequest: data =>
    dispatch(OutletStoreActions.outletStoresListRequest(data)),
})

MapPage.propTypes = {
  onToggleOpen : PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MapPage))
