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
  repositoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  repositoryMetricData: {
    alignItems: 'center'
  }
});

const RepositoryItem = ({ item }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return  Math.round((num / 1000) * 10) / 10 + 'k';
    } else {
      return num;
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.repositoryInfo}>
        <Image 
          source = {{uri: item.ownerAvatarUrl}}
          style = {styles.avatar}
        />
        <View style={styles.repositoryText}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.respositoryLanguage}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.repositoryMetrics}>
        <View style={styles.repositoryMetricData}>
          <Text fontWeight="bold">{formatNumber(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.repositoryMetricData}>
          <Text fontWeight="bold">{formatNumber(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.repositoryMetricData}>
          <Text fontWeight="bold">{formatNumber(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.repositoryMetricData}>
          <Text fontWeight="bold">{formatNumber(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );

};

export default RepositoryItem;