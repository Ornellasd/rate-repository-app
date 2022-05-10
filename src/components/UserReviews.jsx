import { ActivityIndicator, FlatList, View } from 'react-native';

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
  const { loading, error, data } = useQuery(GET_MY_REVIEWS);

  if(error) console.log(`ERROR: ${error.message}`);
  
  if(loading) {
    return (
      <View style={{ flexGrow: 1, top: '40%' }}>
        <ActivityIndicator size="large" color="#00000" />
      </View>
    );
  }

  if(data) {
    const reviews = data.me.reviews.edges;

    return (
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.repositoryId}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }

}

export default UserReviews;