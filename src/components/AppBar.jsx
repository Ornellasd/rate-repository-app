import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#24292e',
    height: 100,
  },
  scrollTainer: {
    marginHorizontal: 20,
  },
  tab: {
    marginLeft: 10,
    padding: 10,
  }
});

const AppBarTab = ({ name, link }) => (
  <Link to={link} style={styles.tab}>
    <Text color="title" fontWeight="bold" fontSize="subheading">{name}</Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollTainer} horizontal>
        <AppBarTab name="Repositories" link="/"  />
        <AppBarTab name="Sign In" link="/signin" />
      </ScrollView>
    </View>
  );
}

export default AppBar;