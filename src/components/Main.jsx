import React from'react';

import { StyleSheet, View, BackHandler, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useBackHandler } from '../hooks/useBackHandler';
import { navigationRef, navigate } from '../utils/rootNavigation';


import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Stack = createNativeStackNavigator();
const routeNameRef = React.createRef();
const previousRouteNameRef = React.createRef();

const Main = () => {  
  const backExitAction = () => {
    if(routeNameRef.current === "Repositories") {
      Alert.alert("Hold on!", "Are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    } else {
      navigate(previousRouteNameRef.current);
    }
  };

  useBackHandler(() => {
    backExitAction();
    return true;
  });


  return (
    <View style={styles.container}>
      <AppBar />
        <NavigationContainer 
          ref={navigationRef}
          onReady={
            () => {
              routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }
          }
          
          onStateChange={() => {
            previousRouteNameRef.current = routeNameRef.current;
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Repositories" component={RepositoryList} />
            <Stack.Screen name="Repository" component={SingleRepository} />
            <Stack.Screen name="Sign In" component={SignIn} />
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Create a Review" component={CreateReview} />
          </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
};

export default Main;