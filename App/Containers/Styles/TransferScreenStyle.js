import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    padding: 10
  },
  amountTo: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 15 : 0
  },
  publicKeyTo: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 0
  },
  inputField: {
    color: 'black',
    flex: 1
  },
  amountToText: {
    fontWeight: 'bold',
    color: 'black'
  }
})
