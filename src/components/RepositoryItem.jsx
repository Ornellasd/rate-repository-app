import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking';

import * as RootNavigation from '../utils/rootNavigation';

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

const GithubButton = ({ url }) => (
  <Pressable
    style={styles.button}
    onPress={() => Linking.openURL(url)} 
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
  // const navigate = useNavigate();
  
  return (
    <Pressable
      // onPress={() => navigate(`/repository/${item.id}`)}
      onPress={() => {
        RootNavigation.navigate('Repository', {
          itemId: item.id
        })
      }}
    >
      <View>
        <View style={styles.itemContainer}>
          <RepositoryInfo item={item} />
          <RepositoryMetrics item={item} />
          {showGit && <GithubButton url={item.url} />}
        </View>
        {showGit && <View style={styles.separator} />}
      </View>
    </Pressable>
   );
};

export default RepositoryItem;