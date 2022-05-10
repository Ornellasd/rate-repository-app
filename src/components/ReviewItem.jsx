import { View, StyleSheet, Pressable } from 'react-native';

import Text from './Text';

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
    button: {
      flexGrow: 1,
      marginHorizontal: 15,
      paddingHorizontal: 20,
      height: theme.formFields.height,
      borderRadius: theme.formFields.borderRadius,
      backgroundColor: theme.colors.buttonPrimary,
      alignItems: 'center',
      justifyContent: 'center',
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
          <Pressable
            style={styles.button}
          >
            <Text color="title" fontWeight="bold" fontSize="subheading">View Repository</Text>
          </Pressable>
          <Pressable
            style={styles.button}
          >
            <Text color="title" fontWeight="bold" fontSize="subheading">Delete Review</Text>
          </Pressable>
        </View>
      }
    </View>
  )
};

export default ReviewItem;