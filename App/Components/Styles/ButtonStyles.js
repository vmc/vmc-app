import { StyleSheet } from 'react-native'
import { Fonts } from '../../Themes'

export default StyleSheet.create({
  button: {
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 3
  },
  buttonText: {
    color: 'black',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
