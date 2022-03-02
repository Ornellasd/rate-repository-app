import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  repositoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  repositoryMetricData: {
    alignItems: 'center'
  },
});

export const formatNumber = (num) => {
  if (num >= 1000) {
    return  Math.round((num / 1000) * 10) / 10 + 'k';
  } else {
    return num;
  }
};

const RepositoryMetrics = ({ item }) => (
  <View style={styles.repositoryMetrics} testID="repoMetrics">
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
);


export default RepositoryMetrics;