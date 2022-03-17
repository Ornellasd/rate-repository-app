import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_REVIEWS } from '../graphql/queries';

import RepositoryItem from './RepositoryItem';
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

const ReviewList = ({ id, repository }) => {
  console.log(id, 'is id loading????');

  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (loading) return null;
  if (error) console.log(`ERROR!: ${error}`);

  const reviews = data.repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      contentContainerStyle={styles.flatlistContainer}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGit={true} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ReviewList;