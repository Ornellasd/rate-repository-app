import { useApolloClient, useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const data = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          text,
          "rating" : parseInt(rating),
        }
      }
    });

    // apolloClient.resetStore();
  };

  return [createReview, result];
};

export default useCreateReview;