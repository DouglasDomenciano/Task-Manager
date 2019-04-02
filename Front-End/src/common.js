import { Alert, Platform } from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
    Alert.alert('O Sh4$t, An error!', `Mensagem: ${err}`)
}

export { server, showError}