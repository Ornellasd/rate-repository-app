import { useQuery } from "@apollo/client";

import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { loading, error, data, ...result } = useQuery(GET_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    reviews: data?.repository.reviews.edges,
    loading,
    ...result,
  };
};

export default useReviews;