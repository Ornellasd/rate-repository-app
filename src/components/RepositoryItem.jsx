import { View, Image, StyleSheet } from 'react-native';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    // marginBottom: 5,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <RepositoryInfo item={item} />
      <RepositoryMetrics item={item} />
    </View>
  );
};

export default RepositoryItem;