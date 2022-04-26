import { useEffect } from 'react';

import { StyleSheet, View, BackHandler, Alert } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { useBackHandler } from '../hooks/useBackHandler';

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

const Main = () => {
  const backExitAction = () => {
    
    Alert.alert("Hold on!", "Are you sure you want to exit app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useBackHandler(() => {
    backExitAction();
    return true;
  });

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/createreview" element={<CreateReview />} exact />
        <Route path="/repository/:id" element={<SingleRepository />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;