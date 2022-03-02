import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  repositoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repositoryText: {
    flex: 1,
    marginLeft: 20,
    height: 100,
    justifyContent: 'space-evenly'
  },
  respositoryLanguage: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: '#fff',
    borderRadius: 4,
    padding: 5,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
});

const RepositoryInfo = ({ item }) => (
  <View style={styles.repositoryInfo} testID="repoInfo">
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
);

export default RepositoryInfo;