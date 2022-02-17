import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  routes: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.routes}>
        <Text color="title" fontWeight="bold" fontSize="subheading">Repositories</Text>
        <Text color="title" fontWeight="bold" fontSize="subheading">Sign in</Text>
      </Pressable>
    </View>
  );
}

export default AppBar;