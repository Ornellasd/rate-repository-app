import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as RootNavigation from '../utils/rootNavigation';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    height: 250,
    paddingVertical: theme.formFields.paddingVertical,
    paddingHorizontal: theme.formFields.paddingHorizontal,
    justifyContent: 'space-between'
  },
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    // absolute positioning here to match where formik text input error would go
    position: 'absolute',
    left: 10,
    bottom: 72,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be 3 or more characters long.')
    .required('Username is required.'),
  password: yup
    .string()
    .min(3, 'Password must be 3 or more characters long.')
    .required('Password is required.')
});

const SignInForm = ({ onSubmit, signInError }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" secureTextEntry />
    {signInError &&
      <Text style={styles.error}>{signInError}</Text>
    }
    <Pressable 
      style={styles.button} 
      onPress={onSubmit}
      testID="submitBtn"
    >
      <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text>
    </Pressable>
  </View>
);

export const SignInContainer = ({ onSubmit, signInError }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} signInError={signInError} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const [error, setError] = useState();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signIn({ username, password });
      RootNavigation.navigate('Repositories');
    } catch (e) {
      setError(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} signInError={error} />;
};

export default SignIn;