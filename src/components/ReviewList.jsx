import { FlatList, StyleSheet } from 'react-native';

import useReviews from '../hooks/useReviews';

import RepositoryItemContainer from './RepositoryItem';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';

import theme from '../theme';

const styles = StyleSheet.create({
  //REFACTOR BUTTON STYLES TO THEME FILE
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flatlistContainer: {
    // paddingBottom: 350
  }
});

const renderItem = ({ item }) => (
  <ReviewItem item={item} />
);

const ReviewList = ({ repository }) => {
  if(!repository) return null;
  
  const id = repository.id;

  const { reviews, fetchMore } = useReviews({
    id,
    first: 3,
  });

  const onEndReach = () => {
    fetchMore();
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