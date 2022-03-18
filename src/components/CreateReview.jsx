import { View, Pressable , StyleSheet} from 'react-native';
import { Formik } from 'formik';

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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Repository owner name" />
      <FormikTextInput name="reopName" placeholder="Repository name" />
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

const initialValues = {
  username: '',
  repoName: '',
  rating: '',
  review: '',
};

const CreateReviewContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
  </Formik>
);

const CreateReview = () => {
  const onSubmit = () => {
    console.log('submitting!');
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
}


export default CreateReview;