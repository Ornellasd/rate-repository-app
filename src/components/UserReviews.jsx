import { FlatList } from 'react-native';

import Text from './Text';

import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';
import { GET_MY_REVIEWS } from '../graphql/queries';

const renderItem = ({ item }) => (
  <ReviewItem item={item} />
);

const UserReviews = () => {
  const currentUserReviews = useQuery(GET_MY_REVIEWS);

  const reviews = currentUserReviews.data.me.reviews.edges;

  // console.log(reviews);
  
  // return <Text>Derp</Text>;
  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.repositoryId}
    />
  )
}

export default UserReviews;