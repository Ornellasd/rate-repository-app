import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik, useField } from 'formik';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

// const borderRadius = 3;
// const height = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    height: 250,
    padding: 10,
    justifyContent: 'space-around'
  },
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
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
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text>
      </Pressable>
    </View>
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