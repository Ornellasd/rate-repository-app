import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as RootNavigation from '../utils/rootNavigation';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    height: 230,
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
    bottom: 68,
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

const SignInForm = ({ onSubmit, signInError, setError }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username"  onChange={() => setError() } />
    <FormikTextInput name="password" placeholder="Password" onChange={() => setError() } secureTextEntry />
    {signInError &&
      <Text color="error" style={styles.error}>{signInError}</Text>
    }
    <Button 
      text="Sign In"
      backgroundColor="primary"
      onPress={onSubmit}
    />
  </View>
);

export const SignInContainer = ({ onSubmit, signInError, setError }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} signInError={signInError} setError={setError} />}
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

  return <SignInContainer onSubmit={onSubmit} signInError={error} setError={setError} />;
};

export default SignIn;