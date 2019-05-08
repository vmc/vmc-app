import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes'

export default StyleSheet.create({
  button: {
    marginVertical: 5,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  buttonText: {
    margin: 18,
    textAlign: 'center',
    color: 'black',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
