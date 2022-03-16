import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import * as Linking from 'expo-linking';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    //// new styles /////
    marginTop: 10,
  },
  separator: {
    height: 8,
  }
});

const GithubButton = () => (
  <Pressable
    style={styles.button}
    onPress={() => Linking.openURL(data.repository.url)} 
  >
    <Text
      color="title"
      fontWeight="bold"
      fontSize="subheading"
    >
      Open in GitHub
    </Text>
  </Pressable>
);

const RepositoryItem = ({ item, showGit }) => {
  return (
    <Link to={`/repository/${item.id}`}>
      <View>
        <View style={styles.itemContainer}>
          <RepositoryInfo item={item} />
          <RepositoryMetrics item={item} />
          {showGit && <GithubButton />}
        </View>
        {showGit && <View style={styles.separator} />}
      </View>
    </Link>
  );
};

export default RepositoryItem;