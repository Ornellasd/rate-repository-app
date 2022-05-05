import { View, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import Constants from 'expo-constants';

import { GET_CURRENT_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import * as RootNavigation from '../utils/rootNavigation';

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

const AppBarTab = ({ name, onPress }) => (
  <Pressable
    style={styles.tab}
    onPress={name === 'Sign Out' ? onPress : () => RootNavigation.navigate(name)}
  >
    <Text color="title" fontWeight="bold" fontSize="subheading">{name}</Text>
  </Pressable>
);


const AppBar = ({ navigation }) => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const currentUser = useQuery(GET_CURRENT_USER);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const currentUserTabs = () => (
    <>
      <AppBarTab name="Create a Review" />
      <AppBarTab name="My Reviews"/>
      <AppBarTab name="Sign Out" onPress={signOut}/>
    </>
  );

  const nonUserTabs =  () => (
    <>
      <AppBarTab name="Sign In" />
      <AppBarTab name="Sign Up" />
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollTainer} horizontal>
        <AppBarTab name="Repositories" link="/"  />

        { currentUser.data && currentUser.data.me
          ? currentUserTabs()
          : nonUserTabs()
        }

      </ScrollView>
    </View>
  );
}

export default AppBar;