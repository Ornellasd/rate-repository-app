import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    height: 250,
    // padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
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
      <Pressable 
        style={styles.button} 
        onPress={onSubmit}
      >
        <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text>
      </Pressable>
    </View>
  )
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

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;