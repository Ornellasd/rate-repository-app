import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    // flexWrap: 'wrap',

    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
  },
  repositoryInfo: {
    // flexWrap: 'wrap',
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
  }

});

const RepositoryItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.repositoryInfo}>
      <Image 
        source = {{uri: item.ownerAvatarUrl}}
        style = {styles.avatar}
      />
      <View style={styles.repositoryText}>
        <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
        <Text color="textSecondary">{item.description}</Text>
        {/* <Text style={styles.respositoryLanguage}>{item.language}</Text> */}
      </View>
    </View>

    <View style={styles.repositoryMetrics}>
      <View>
        <Text>{item.stargazersCount}</Text>
        <Text>Stars</Text>
      </View>
      <View>
        <Text>{item.forksCount}</Text>
        <Text>Forks</Text>
      </View>
      <View>
        <Text>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View>
        <Text>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
    {/* <View style={styles.repositoryMetrics}>
      <View style={styles.repositoryMetricDatum}>
        <Text>{item.stargazersCount}</Text>
        <Text>{item.forksCount}</Text>
        <Text>{item.reviewCount}</Text>
        <Text>{item.ratingAverage}</Text>
      </View>
      <View style={styles.repositoryMetricTitles}>
        <Text>Stars</Text>
        <Text>Forks</Text>
        <Text>Reviews</Text>
        <Text>Rating</Text>
      </View>
     
    </View> */}
    
  </View>
);

export default RepositoryItem;