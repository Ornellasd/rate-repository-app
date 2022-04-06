import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    paddingVertical: theme.formFields.paddingVertical,
    paddingHorizontal: theme.formFields.paddingHorizontal,
  },
  button: {
    backgroundColor: theme.colors.buttonPrimary,
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be 3 or more characters long.')
    .required('Username is required'),
});

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" type="password" placeholder="Password" secureTextEntry />
    <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
    <Pressable 
      onPress={onSubmit}
      style={styles.button}
    >
      <Text color="title" fontWeight="bold" fontSize="subheading">Sign Up</Text>
    </Pressable>
  </View>
);

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;