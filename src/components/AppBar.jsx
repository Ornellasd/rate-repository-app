import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: 10,
    backgroundColor: '#24292e'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text color="title" fontWeight="bold">Repositories</Text>
    </View>
  );
}

export default AppBar;