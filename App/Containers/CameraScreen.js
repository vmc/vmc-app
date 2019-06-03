'use strict'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import ImageActions from '../Redux/ImageRedux'
import styles from './Styles/CameraScreenStyles'

class CameraScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={({ barcodes }) => {
            console.log(barcodes)
          }}
          captureAudio={false}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.1, base64: true }
      const data = await this.camera.takePictureAsync(options)
      this.props.postImage(data.base64)
      this.props.navigation.pop()
    }
  };
}

function mapDispatchToProps (dispatch) {
  return {
    postImage: (base64) => dispatch(ImageActions.postImage(base64))
  }
}

export default connect(null, mapDispatchToProps)(CameraScreen)
