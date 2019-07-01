import React, { Component } from 'react'
import { View, TouchableOpacity, PermissionsAndroid, Text, Image } from 'react-native'
import Header from '../Components/Header'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Geolocation from 'react-native-geolocation-service'
import firebase, { Notification } from 'react-native-firebase'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './Styles/MapScreenStyles'
import Secrets from 'react-native-config'
import RoutePlanner from './RoutePlanner'
import Modal from 'react-native-modal'
import Images from '../Themes/Images'

Mapbox.setAccessToken(Secrets.MapBoxToken)

// Styling object of the map
const mapStyles = Mapbox.StyleSheet.create({
  lines: {
    lineColor: Mapbox.StyleSheet.identity('color'),
    lineWidth: 3,
    lineCap: 'round',
    lineJoin: 'round',
    lineDasharray: Mapbox.StyleSheet.identity('lineDasharray')
  }
})

export default class MapScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Find a ride',
    drawerIcon: ({ tintColor }) => (
      <Icon name='gps-fixed' size={20} color={tintColor} />
    )
  };

  constructor (props) {
    super(props)

    this.state = {
      directions: null,
      routePlannerVisible: false
    }

    this.passTextInput = null
  }

  componentWillMount () {
    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
      {
        title: 'Give Location Permission',
        message: 'App needs location permission to find your position.'
      }
    ).then(granted => {
      this.centerUserLocation()
    }).catch(err => {
      console.warn(err)
    })
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      alert(notification._body, notification._body)
      console.log(notification)
    })
  }

  componentWillUnmount () {
    this.notificationListener()
  }

  centerUserLocation () {
    this.setState({ userTrackingMode: Mapbox.UserTrackingModes.Follow })
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
        this.setState({ userLat: position.coords.latitude, userLong: position.coords.longitude })
        this._map.flyTo([position.coords.longitude, position.coords.latitude])
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  renderDirections () {
    var directions = this.state.directions

    if (!directions) {
      return null
    }

    directions = directions.directions

    const routes = directions.features
    const lastRouteCoordinates = routes[routes.length - 1].geometry.coordinates
    const lastCoordinate = lastRouteCoordinates[lastRouteCoordinates.length - 1]

    return (
      <View>
        <Mapbox.ShapeSource id='mapbox-directions-source' shape={directions}>
          <Mapbox.LineLayer
            id='mapbox-directions-line'
            style={mapStyles.lines}
          />
        </Mapbox.ShapeSource>
        <Mapbox.PointAnnotation
          id='endPoint'
          coordinate={lastCoordinate}
          anchor={{x: 0.5, y: 1}}
        >
          <Image source={Images.map_marker} style={{height: 25, width: 25}} />
        </Mapbox.PointAnnotation>
      </View>
    )
  }

  renderOption () {
    const route = this.state.directions
    var totalMinutes = 0
    if (route) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LaunchScreen')} style={styles.routeOption}>
          <View style={{flexDirection: 'row'}}>
            {route.directions.features.map((feature, j) => {
              totalMinutes += Math.round(feature.duration / 60)
              return (
                <View key={j} style={{flexDirection: 'row'}}>
                  <Icon color='black' size={25} name={feature.transportType === 'walk' ? 'directions-walk' : 'directions-subway'} />
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 10}}>{Math.round(feature.duration / 60)}</Text>
                  </View>
                  {j < route.directions.features.length - 1 ? <Icon size={25} name='chevron-right' /> : null}
                </View>
              )
            })}
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>{totalMinutes} min</Text>
          </View>
          <View style={{borderColor: '#ebebeb', borderWidth: 1, borderRadius: 2, justifyContent: 'center', alignItems: 'center', padding: 5}}>
            <Text style={{color: 'black'}}>Buy ticket</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }

  showRoute (route) {
    this.setState({directions: route})
    this.fitMap(route)
  }

  // Fit map to the outside corners of a geojson route object

  fitMap (route) {
    const allCoordinates = route.directions.features.map((feature) => {
      return feature.geometry.coordinates
    })

    var north, south, west, east
    north = south = allCoordinates[0][0][1]
    west = east = allCoordinates[0][0][0]

    for (let i = 0; i < allCoordinates.length; i++) {
      const coordinateList = allCoordinates[i]
      for (let j = 0; j < coordinateList.length; j++) {
        if (coordinateList[j][0] > east) {
          east = coordinateList[j][0]
        }
        if (coordinateList[j][0] < west) {
          west = coordinateList[j][0]
        }
        if (coordinateList[j][1] > north) {
          north = coordinateList[j][1]
        }
        if (coordinateList[j][1] < south) {
          south = coordinateList[j][1]
        }
      }
    }
    this._map.fitBounds([west, north], [east, south], 20)
  }

  render () {
    const renderDirections = this.renderDirections()

    return (
      <View style={styles.container}>
        <Header {...this.props} />
        <Modal useNativeDriver isVisible={this.state.routePlannerVisible} style={styles.modal} >
          <RoutePlanner
            dismiss={() => this.setState({routePlannerVisible: false})}
            currentLatitude={this.state.userLat}
            currentLongitude={this.state.userLong}
            showRoute={(route) => this.showRoute(route)}
          />
        </Modal>
        <View style={{ flex: 1 }}>
          <Mapbox.MapView
            ref={(c) => { this._map = c }}
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={15}
            showUserLocation
            style={styles.container}
            userTrackingMode={Mapbox.UserTrackingModes.Follow}
            rotateEnabled={false}
            onPress={() => this.setState({ stepSelected: false })}
          >
            {renderDirections}
          </Mapbox.MapView>
          <TouchableOpacity
            onPress={() => this.centerUserLocation()}
            style={styles.centerLocation}
          >
            <Icon name='gps-fixed' size={25} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({routePlannerVisible: true})}
            style={styles.plannerButton}
          >
            <Icon name='directions' size={25} color='white' />
          </TouchableOpacity>
        </View>
        {this.renderOption()}
      </View>
    )
  }
}
