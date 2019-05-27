import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button, AsyncStorage, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Header from '../Components/Header'
import { PermissionsAndroid } from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Geolocation from 'react-native-geolocation-service'
import firebase, { Notification } from 'react-native-firebase'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/LaunchScreenStyles'
import Secrets from 'react-native-config'

Mapbox.setAccessToken(Secrets.MapBoxToken)

export default class LaunchScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Book a ride',
    drawerIcon: ({tintColor}) => (
      <Icon name='gps-fixed' size={20} color={tintColor} />
    )
  };

  constructor (props) {
    super(props)

    this.state = {
      stepLocations: [
        {
          id: '1',
          latitude: 52.369838,
          longitude: 4.882422
        },
        {
          id: '2',
          latitude: 52.371220,
          longitude: 4.884511
        }
      ],
      directions: null,
      distance: 0,
      stepSelected: false
    }
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
    console.log('HIHIHI')
    this.setState({userTrackingMode: Mapbox.UserTrackingModes.Follow})
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
        this.setState({userLat: position.coords.latitude, userLong: position.coords.longitude})
        this._map.flyTo([position.coords.longitude, position.coords.latitude])
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    )
  }

  async fetchDirections (originLong, originLat, destLong, destLat) {
    coords = originLong + ',' + originLat + ';' + destLong + ',' + destLat
    console.log(coords)
    request = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + coords + '?access_token=pk.eyJ1IjoibWF4dm1jIiwiYSI6ImNqc2Q3czI4aTBzbWU0YWxuMjRxdDRpZ3QifQ.Z2pufOgsgEFeQ-1mSd63pw&geometries=geojson'
    try {
      let response = await fetch(
        request
      )
      let responseJson = await response.json()
      console.log(responseJson)
      if (responseJson.routes[0] != undefined) {
        this.setState({directions: responseJson.routes[0], duration: Math.ceil(responseJson.routes[0].duration / 60)})
      }
    } catch (error) {
      console.error(error)
    }
  }

  planRoute (id, longitude, latitude) {
    this.setState({stepSelected: true, id: id, duration: '...', directions: null})
    this.fetchDirections(this.state.userLong, this.state.userLat, longitude, latitude)
  }

  renderAnnotations () {
    return (
      <View>
        {this.state.stepLocations.map(location => (
          <Mapbox.PointAnnotation
            key={location.id}
            id={location.id}
            coordinate={[location.longitude, location.latitude]}
          >
            <TouchableOpacity onPress={() => this.planRoute(location.id, location.longitude, location.latitude)} style={styles.annotationContainer}>
              <View style={[styles.annotationFill, {backgroundColor: location.selected ? '#3AD29F' : '#0067B2'}]} />
            </TouchableOpacity>
            {/*            <Mapbox.Callout containerStyle={styles.callout}>
            <TouchableOpacity onPress={() => alert('Booked! Vehicle id is ' + location.id)} style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', textAlign: 'center'}}>Book - {Math.ceil(60 / this.state.duration)} min </Text>
              <Icon name="directions-walk" size={18} color="white" />
            </TouchableOpacity>
          </Mapbox.Callout> */}
          </Mapbox.PointAnnotation>
        ))}
      </View>
    )
  }

  renderDirections () {
    directions = this.state.directions

    if (!directions) {
      return null
    }

    return (
      <Mapbox.ShapeSource id='mapbox-directions-source' shape={directions.geometry}>
        <Mapbox.LineLayer
          id='mapbox-directions-line'
          style={{lineColor: '#0067B2', lineWidth: 3, lineCap: 'round'}}
        />
      </Mapbox.ShapeSource>
    )
  }

  bookVehicle (id) {
    this.props.navigation.navigate('CameraScreen')
  }

  render () {
    return (
      <View style={styles.container}>
        <Header {...this.props} />
        <Mapbox.MapView
          ref={(c) => this._map = c}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          showUserLocation
          style={styles.container}
          userTrackingMode={Mapbox.UserTrackingModes.Follow}
          rotateEnabled={false}
          onPress={() => this.setState({stepSelected: false})}
        >
          {this.renderAnnotations()}
          {this.renderDirections()}
        </Mapbox.MapView>
        <TouchableOpacity
          onPress={() => this.centerUserLocation()}
          style={styles.centerLocation}
        >
          <Icon name='gps-fixed' size={25} color='white' />
        </TouchableOpacity>
        {this.state.stepSelected
          ? <View>
            <TouchableOpacity
              onPress={() => this.centerUserLocation()}
              style={[styles.centerLocation, {bottom: 225}]}
            >
              <Icon name='gps-fixed' size={25} color='white' />
            </TouchableOpacity>
            <View elevation={5} style={{position: 'absolute', width: '100%', height: 200, bottom: 0, backgroundColor: 'white', zIndex: 111, padding: 20, justifyContent: 'space-between'}} >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'black'}}>Swheel ({this.state.id})</Text>
                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={() => this.setState({stepSelected: false})}>
                  <Icon name='expand-more' size={18} color='black' />
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'black', marginRight: 5}}>{this.state.duration} min</Text>
                  <Icon name='directions-walk' size={18} color='black' />
                </View>
              </View>
              <TouchableOpacity elevation={5} onPress={() => this.bookVehicle(this.state.id)} style={{flex: 0.4, backgroundColor: '#0067B2', justifyContent: 'center', alignItems: 'center', height: 30}} >
                <Text style={{color: 'white'}}>Huren</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Actueel tarief:</Text>
                <Text>&euro;0.50/min</Text>
              </View>
            </View>
          </View>
        : null}
      </View>
    )
  }
}
