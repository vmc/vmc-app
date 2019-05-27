import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { green } from 'ansi-colors';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modal: {
    backgroundColor: 'white',
    padding: 10
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
