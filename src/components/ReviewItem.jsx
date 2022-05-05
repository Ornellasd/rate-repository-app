import { View, StyleSheet } from 'react-native';

import Text from './Text';

import theme from '../theme';

const ReviewItem = ({ item }) => {
  const styles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: 10,
      /////// new styles/////
      flexDirection: 'row',
      // marginTop: 8,
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
  });

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

export default ReviewItem;