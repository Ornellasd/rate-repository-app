import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';

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
    marginLeft: 20
  },
  respositoryLanguage: {
    backgroundColor: '#0366d6',
    color: '#fff'
  },
  avatar: {
    width: 75,
    height: 75,
  },
  repositoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  repositoryMetricData: {
    alignItems: 'center'
  }

});

const RepositoryItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.repositoryInfo}>
      {/* <Image 
        source = {{uri: item.ownerAvatarUrl}}
        style = {styles.avatar}
      /> */}
      <View style={styles.repositoryText}>
        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        {/* <Text style={styles.respositoryLanguage}>{item.language}</Text> */}
      </View>
    </View>

    <View style={styles.repositoryMetrics}>
      <View style={styles.repositoryMetricData}>
        <Text fontWeight="bold">{item.stargazersCount}</Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.repositoryMetricData}>
        <Text fontWeight="bold">{item.forksCount}</Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.repositoryMetricData}>
        <Text fontWeight="bold">{item.reviewCount}</Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.repositoryMetricData}>
        <Text fontWeight="bold">{item.ratingAverage}</Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;