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

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');

  return (
    <Formik initialValues={initialValues}>
      <View style={styles.container}>
        <TextInput 
          style={styles.inputField} 
          placeholder="Username"
          value={usernameField.value}
          onChangeText={text => usernameHelpers.setValue(text)}
        />
        <TextInput 
          style={styles.inputField} 
          placeholder="Password"
          value={passwordField.value}
          onChangeText={text => passwordHelpers.setValue(text)}
          secureTextEntry 
        />
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text>
        </Pressable>
      </View>
    </Formik>
  )
};

const SignIn = () => {
  const onSubmit = values => {
    const username = values.username;
    const password = values.password;

    console.log(`Your username is '${username}' and your password is '${password}'.`)
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;