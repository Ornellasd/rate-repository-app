import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text color="title">Repositories</Text>
    </View>
  );
}

export default AppBar;