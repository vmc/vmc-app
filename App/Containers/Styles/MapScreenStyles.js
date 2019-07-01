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
  plannerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0067B2',
    position: 'absolute',
    left: 25,
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
  },
  locationInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10
  },
  routeOption: {
    padding: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
