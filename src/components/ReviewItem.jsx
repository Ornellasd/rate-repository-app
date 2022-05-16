import { View, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_CURRENT_USER } from '../graphql/queries';
import Text from './Text';
import Button from './Button';
import theme from '../theme';

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

const ReviewItem = ({ item, byOwner }) => {
  const { createdAt, text, user, rating } = item.node;
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-US');

  const [deleteReview, { error }] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{
      query:  GET_CURRENT_USER,
      variables: {
        includeReviews: true,
      },
    }]
  });

  if(error) console.log(error.message);

  const createDeleteButtonAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteReview({ variables: { deleteReviewId: item.node.id } }) }
      ]
    );
  };

  return (
    <View>
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
          <Button 
            text="View repository" 
            backgroundColor="primary"
            route={{ screen: 'Repository', id: item.node.repository.id }}
          />
          <Button text="Delete review"
            backgroundColor="danger" 
            onPress={createDeleteButtonAlert}
          />
        </View>
      }
    </View>
  );
};

export default ReviewItem;