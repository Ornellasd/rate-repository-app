import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_REVIEWS } from '../graphql/queries';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
  },
  //REFACTOR BUTTON STYLES TO THEME FILE
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

{/* <Text color="title" fontWeight="bold" fontSize="subheading">Sign In</Text> */}


const ReviewItem = ({ item }) => {
  const { createdAt, text, user } = item.node;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US');

  return (
    <View style={styles.itemContainer}>
      <Text fontWeight="bold" fontSize="subheading">{user.username}</Text>
      <Text color="textSecondary">{formattedDate}</Text>
      <Text>{text}</Text>
    </View>
  )
};

const renderItem = ({ item }) => (
  <ReviewItem item={item} />
);

const ReviewList = ({ id }) => {

  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { id },
  });

  if (loading) return null;
  if (error) console.log(`ERROR!: ${error}`);

  // data.repository.reviews.edges.forEach(review => {
  //   console.log(review.node.rating);
  // });

  const reviews = data.repository.reviews.edges;

  return (
    // <Text>REVIEWS</Text>
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem} 
    />
  );
};

export default ReviewList;