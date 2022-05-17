import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Button from './Button';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import * as RootNavigation from '../utils/rootNavigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    paddingVertical: theme.formFields.paddingVertical,
    paddingHorizontal: theme.formFields.paddingHorizontal,
    height: 308,
    justifyContent: 'space-between'
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
    .min(3, 'Username must be 3 or more characters long')
    .max(30, 'Username must be no more than 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be 5 or more characters long')
    .max(50, 'Password must be no more than 50 characters long')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords do no match')
});

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput name="password" type="password" placeholder="Password" secureTextEntry />
    <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
    <Button 
      text="Sign Up"
      backgroundColor="primary"
      onPress={onSubmit}
    />
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
  const [mutate] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, password, passwordConfirm } = values;

    if(password === passwordConfirm) {
      try {
        await mutate({
          variables: {
            user: {
              username,
              password
            }
          }
        });
        
        RootNavigation.navigate('Repositories');
      } catch(e) {
        console.log(e);
      }
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;