import { Pressable, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
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

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" placeholder="Password" />
    <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" />
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