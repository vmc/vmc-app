import { ToastAndroid } from 'react-native'

const messages = {
  networkError: 'There seems to be no internet connection.',
  serverError: 'The server is not responding. Please try again later.'
}

export default function showError (response) {
  switch (response.problem) {
    case ('CONNECTION_ERROR' || 'TIMEOUT_ERROR'):
      ToastAndroid.show(messages.serverError, ToastAndroid.LONG)
      break
    case 'NETWORK_ERROR':
      ToastAndroid.show(messages.networkError, ToastAndroid.LONG)
      break
    default:
      ToastAndroid.show(response.data.message, ToastAndroid.LONG)
  }
}
