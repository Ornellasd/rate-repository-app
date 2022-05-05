import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import useReviews from '../hooks/useReviews';

import { GET_REVIEWS } from '../graphql/queries';

import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    /////// new styles/////
    flexDirection: 'row',
    // marginTop: 8,
  },
  //REFACTOR BUTTON STYLES TO THEME FILE
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingBorder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rating: {
    color: theme.colors.primary,
  },
  ratingsInfo: {
    flex: 1,
    marginLeft: 10,
  },
  flatlistContainer: {
    // paddingBottom: 350
  }
});

const ReviewItem = ({ item }) => {
  const { createdAt, text, user, rating } = item.node;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US');

  return (
    <View style={styles.itemContainer}>
      <View style={styles.ratingBorder}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.ratingsInfo}>
        <Text fontWeight="bold" fontSize="subheading">{user.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  )
};

const renderItem = ({ item }) => (
  <ReviewItem item={item} />
);

const ReviewList = ({ repository }) => {
  if(!repository) return null;
  
  const id = repository.id;

  const { reviews } = useReviews({
    id,
    first: 3,
  });

  const onEndReach = () => {
    console.log('You have reached end of the reviews');
  };

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      contentContainerStyle={styles.flatlistContainer}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryItemContainer item={repository} showGit={true} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewList;