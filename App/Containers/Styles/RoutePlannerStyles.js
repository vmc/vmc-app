import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5
  },
  inputContainer: {
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ebebeb',
    borderRadius: 8,
    marginLeft: 5,
    padding: 10
  },
  optionList: {
    borderTopWidth: 1,
    borderTopColor: '#ebebeb'
  },
  autoFillItem: {
    padding: 5,
    borderColor: '#ebebeb',
    borderTopWidth: 1,
    marginBottom: 2,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  route: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    padding: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ebebeb',
    backgroundColor: 'white',
    elevation: 3
  },
  divider: {
    backgroundColor: '#ebebeb',
    height: 5
  },
  currentLocation: {
    marginLeft: 10,
    color: '#0067B2'
  }
})
