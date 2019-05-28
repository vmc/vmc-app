import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modal: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center'
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buyButton: {
    backgroundColor: 'green'
  }
})
