import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik, useField } from 'formik';

import Text from './Text';
import theme from '../theme';

const borderRadius = 3;
const height = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    height: 250,
    padding: 10,
    justifyContent: 'space-around'
  },
  inputField : {
    paddingLeft: 10,
    borderColor: '#8f8f8f',
    borderWidth: 1,
    borderRadius,
    height,
  },
  button: {
    height,
    borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputField} placeholder="Username" />
      <TextInput style={styles.inputField} placeholder="Password" secureTextEntry />
      <Pressable style={styles.button}>
        <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;