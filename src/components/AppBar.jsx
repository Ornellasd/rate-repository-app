import { View, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';

import { GET_CURRENT_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

import Text from './Text';
import { useContext } from 'react';

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
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const currentUser = useQuery(GET_CURRENT_USER);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const currentUserTabs = () => (
    <>
      <AppBarTab name="Create a Review" link="/createreview" />
      <AppBarTab name="Sign Out" onPress={signOut}/>
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollTainer} horizontal>
        <AppBarTab name="Repositories" link="/"  />

        { currentUser.data && currentUser.data.me
          ? currentUserTabs()
          : <AppBarTab name="Sign In" link="/signin" />
        }

      </ScrollView>
    </View>
  );
}

export default AppBar;