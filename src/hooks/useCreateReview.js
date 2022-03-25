import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          text,
          "rating" : parseInt(rating),
        }
      }
    });
  };

  return [createReview, result];
};

export default useCreateReview;