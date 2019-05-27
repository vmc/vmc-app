import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  callout: {
    backgroundColor: '#0067B2',
    padding: 10,
    position: 'relative'
  },
  centerLocation: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0067B2',
    position: 'absolute',
    right: 25,
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0067B2',
    transform: [{ scale: 0.6 }]
  }
})
