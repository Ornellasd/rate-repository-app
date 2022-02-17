import { View, Image, StyleSheet } from 'react-native';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
  },
  repositoryInfo: {
    flexDirection: 'row',
  },
  repositoryText: {
    marginLeft: 20,
    flex: 1,
  },
  respositoryLanguage: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: '#fff',
    borderRadius: 4,
    marginTop: 5,
    padding: 5,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 8,
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