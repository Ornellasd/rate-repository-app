import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:token`,
    );

    return rawToken ? JSON.parse(rawToken) : null;
  }

  async setAccessToken(accessToken) {
    const currentToken = await this.getAccessToken();
    console.log(currentToken);

    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }

  removeAccessToken() {

  }
}

export default AuthStorage;