import { View, StyleSheet, Pressable } from 'react-native';
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
      <Pressable>
        <Text color="title" fontWeight="bold" fontSize="subheading">Repositories</Text>
      </Pressable>
    </View>
  );
}

export default AppBar;