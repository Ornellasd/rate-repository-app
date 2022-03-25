import { View, Pressable , StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.title,
    paddingVertical: theme.formFields.paddingVertical,
    paddingHorizontal: theme.formFields.paddingHorizontal,
    height: 390,
    justifyContent: 'space-between'
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, 'Repository owner name must be 3 or more characters long.')
    .required('Repository owner name is required.'),
  repositoryName: yup
    .string()
    .required('Repository name is required.'),
  rating: yup
    .number().min(0).max(100)
    .typeError('Rating must be a number.')
    .required('Rating is required'),
  text: yup
    .string()
    .nullable()
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" />

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
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({ ...values });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch(e) {
      console.log(e);
    }
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