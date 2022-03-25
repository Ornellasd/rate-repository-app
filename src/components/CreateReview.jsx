import { View, Pressable , StyleSheet} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    paddingVertical: theme.formFields.paddingVertical,
    paddingHorizontal: theme.formFields.paddingHorizontal,
  },
  button: {
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.formFields.borderRadius,
    height: theme.formFields.height,
    alignItems: 'center',
    justifyContent: 'center',
    // height
  }
});

const initialValues = {
  username: '',
  repoName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be 3 or more characters long.')
    .required('Username is required.'),
  repoName: yup
    .string()
    .required('Repository name is required.'),
  rating: yup
    .string()
    .required('Rating is required')
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Repository owner name" />
      <FormikTextInput name="repoName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" />

      <Pressable 
        onPress={onSubmit}
        style={styles.button}
      >
        <Text color="title" fontWeight="bold" fontSize="subheading">Submit Review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const onSubmit = async (values) => {
    const { username, repoName, rating, review } = values;

    console.log(username);
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
}

const CreateReviewContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

export default CreateReview;