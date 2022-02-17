import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  routes: {
    // justifyContent: 'space-around'
  }
});

const AppBarTab = ({ name, link }) => (
  <Link to={link}>
    <Text color="title" fontWeight="bold" fontSize="subheading">{name}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repositories" link="/" />
      <AppBarTab name="Sign In" link="/signin"  />
    </View>
  );
}

export default AppBar;