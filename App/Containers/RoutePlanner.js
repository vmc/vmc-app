import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, Text, ScrollView, ActivityIndicator } from 'react-native'
import styles from './Styles/RoutePlannerStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Secrets from 'react-native-config'
import Toast from 'react-native-simple-toast'

// Small trick to keep state when opening/closing (mounting/unmounting) the planner.
var state = {
  autoComplete: [],
  fromLocationText: '',
  toLocationText: '',
  fromLocationCoords: [],
  toLocationCoords: [],
  routes: []
}

export default class RoutePlanner extends Component {
  constructor (props) {
    super(props)
    this.state = state
  }

  timeout = null

  componentWillUnmount () {
    // Remember state for the next mount
    state = this.state
  }

  // TODO If call is made to vmc backend, change to sagas take latest
  async autoFill (text) {
    if (this.state.fromFocus) {
      this.setState({fromLocationText: text, fromLocationCoords: []})
    } else if (this.state.toFocus) {
      this.setState({toLocationText: text, toLocationCoords: []})
    }

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      if (text.length > 2) {
        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + text + '.json?access_token=' + Secrets.MapBoxToken + '&proximity=' + this.props.currentLongitude + ',' + this.props.currentLatitude)
        .then((response) => response.json())
        .then((responseJson) => {
          try {
            const features = responseJson.features.slice(0, 3)
            var autoComplete = []
            for (var i = 0; i < features.length; i++) {
              autoComplete[i] = [features[i].place_name, features[i].center]
            }
            this.setState({autoComplete})
          } catch (e) {
            console.log(e)
            this.setState({autoComplete: []})
          }
        })
        .catch((error) => {
          console.error('Error', error)
        })
      } else {
        this.setState({autoComplete: []})
      }
    }, 200)
  }

  selectAutoFill (data) {
    if (this.state.fromFocus) {
      this.setState({fromLocationText: data[0], fromLocationCoords: data[1], autoComplete: []})
      this.fromInput.blur()
      this.toInput.focus()
    } else if (this.state.toFocus) {
      this.setState({toLocationText: data[0], toLocationCoords: data[1], autoComplete: []}, () => this.findRoutes())
      this.toInput.blur()
    }
  }

  findRoutes () {
    this.setState({routes: [], loading: true})
    const fromLoc = this.state.fromLocationCoords
    const toLoc = this.state.toLocationCoords
    if (fromLoc.length < 2 || toLoc.length < 2) {
      this.setState({loading: false})
      Toast.show('Please select both locations from the suggestions.', Toast.SHORT)
      return
    }
    const url = 'http://develop.vmc.ai:5000/planner/route?origin_lat=' + fromLoc[0] + '&origin_lon=' + fromLoc[1] + '&dest_lat=' + toLoc[0] + '&dest_lon=' + toLoc[1]
    console.log(url)
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({loading: false, routes: [responseJson]}) // TODO: delete list
    })
    .catch((error) => {
      console.error(error)
    })
  }

  showRoute (route) {
    this.props.showRoute(route)
    this.props.dismiss()
  }

  renderRoutes () {
    return this.state.routes.map((route, i) => {
      var totalMinutes = 0
      return (
        <View key={i}>
          <TouchableOpacity onPress={() => this.showRoute(route)} style={styles.route}>
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
            <View>
              <Text style={{color: 'black'}}>{totalMinutes} min</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
      )
    })
  }

  setCurrentLocation () {
    if (this.state.fromFocus) {
      this.setState({fromLocationText: 'Your location', fromLocationCoords: [this.props.currentLongitude, this.props.currentLatitude]})
      this.fromInput.blur()
      this.toInput.focus()
    } else if (this.state.toFocus) {
      this.setState({toLocationText: 'Your location', toLocationCoords: [this.props.currentLongitude, this.props.currentLatitude]}, () => this.findRoutes())
      this.toInput.blur()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputContainer}>
            <Icon2 color='black' name='circle-medium' size={25} />
            <TextInput
              ref={(ref) => { this.fromInput = ref }}
              style={styles.input}
              value={this.state.fromLocationText}
              onChangeText={(text) => this.autoFill(text)}
              onFocus={() => this.setState({fromFocus: true})}
              onBlur={() => this.setState({fromFocus: false, autoComplete: []})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon color='black' name='place' size={25} />
            <TextInput
              ref={(ref) => { this.toInput = ref }}
              style={styles.input}
              value={this.state.toLocationText}
              onChangeText={(text) => this.autoFill(text)}
              onFocus={() => this.setState({toFocus: true})}
              onBlur={() => this.setState({toFocus: false, autoComplete: []})}
            />
          </View>
          {(this.state.fromFocus || this.state.toFocus) & this.state.toLocationText !== 'Your location' & this.state.fromLocationText !== 'Your location' ?
            <TouchableOpacity onPress={() => this.setCurrentLocation()} style={styles.inputContainer}>
              <Icon name='gps-fixed' size={25} color='#0067B2' />
              <Text style={styles.currentLocation}>Your location</Text>
            </TouchableOpacity>
            : null
          }
          <View style={styles.autoFill}>
            {this.state.autoComplete.map((data, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => this.selectAutoFill(data)} style={styles.autoFillItem}>
                  <Icon name='location-searching' size={25} />
                  <Text style={{color: 'black', marginHorizontal: 5}} key={data}>{data[0]}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
          <ScrollView style={styles.optionList}>
            {this.renderRoutes()}
          </ScrollView>
          {this.state.loading ? <ActivityIndicator style={{marginTop: 25}} /> : null}
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={() => this.props.dismiss()}>
            <Text style={{color: 'black'}}>
              {'    Cancel    '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
