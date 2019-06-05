import Toast from 'react-native-simple-toast'

const messages = {
  networkError: 'There seems to be no internet connection.',
  serverError: 'The server is not responding. Please try again later.'
}

export default function showError (response) {
  switch (response.problem) {
    case ('CONNECTION_ERROR' || 'TIMEOUT_ERROR'):
      Toast.show(messages.serverError, Toast.LONG)
      break
    case 'NETWORK_ERROR':
      Toast.show(messages.networkError, Toast.LONG)
      break
    default:
      Toast.show(response.data.message, Toast.LONG)
  }
}
