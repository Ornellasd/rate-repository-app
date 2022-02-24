import { View, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';

import { GET_CURRENT_USER } from '../graphql/queries';

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

const AppBarTab = ({ name, link="", onPress }) => (
  <Link to={link} style={styles.tab}>
    <Text color="title" fontWeight="bold" fontSize="subheading" onPress={onPress}>{name}</Text>
  </Link>
);

const AppBar = () => {
  const isCurrentUser = useQuery(GET_CURRENT_USER);

  const signOut = () => {
    console.log('derp');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollTainer} horizontal>
        <AppBarTab name="Repositories" link="/"  />
        { isCurrentUser.data
          ? <AppBarTab name="Sign Out" onPress={signOut}/>
          : <AppBarTab name="Sign In" link="/signin" />
        }
      </ScrollView>
    </View>
  );
}

export default AppBar;