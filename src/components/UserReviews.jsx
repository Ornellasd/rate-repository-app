import Text from './Text';

import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';
import { GET_MY_REVIEWS } from '../graphql/queries';

const UserReviews = () => {
  const currentUser = useQuery(GET_CURRENT_USER);
  const currentUserReviews = useQuery(GET_MY_REVIEWS);

  console.log(currentUserReviews.data.me.reviews.edges);

  return <Text>Derp</Text>;
}

export default UserReviews;