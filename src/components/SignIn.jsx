import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    // await signIn({ username, password });

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    // console.log(`Your username is '${username}' and your password is '${password}'.`)
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