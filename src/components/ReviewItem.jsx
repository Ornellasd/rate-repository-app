import { View, StyleSheet, Pressable } from 'react-native';

import Text from './Text';
import Button from './Button';

import theme from '../theme';

const ReviewItem = ({ item, byOwner }) => {
  const styles = StyleSheet.create({
    itemContainer: {
      display: 'flex',
      backgroundColor: '#fff',
      padding: 10,
      flexDirection: 'row',
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.title,
      paddingBottom: 10,
    },
  });

  const { createdAt, text, user, rating, repositoryId } = item.node;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US');

  return (
    <View style={styles.outerContainer}>
      <View style={styles.itemContainer}>
        <View style={styles.ratingBorder}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.rating}>{rating}</Text>
        </View>
        <View style={styles.ratingsInfo}>
          <Text fontWeight="bold" fontSize="subheading">{user ? user.username : item.node.repository.fullName}</Text>        
          <Text color="textSecondary">{formattedDate}</Text>
          <Text>{text}</Text>
    
        </View>
      </View>
      {byOwner &&
        <View style={styles.buttonContainer}>
          <Button text="View repository" backgroundColor="primary" />
          <Button text="Delete review" backgroundColor="danger" />
        </View>
      }
    </View>
  )
};

export default ReviewItem;