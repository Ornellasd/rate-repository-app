import { View, StyleSheet, Pressable } from 'react-native';
import * as RootNavigation from '../utils/rootNavigation';
import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';
import Button from './Button';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  separator: {
    height: 8,
  }
});

const RepositoryItem = ({ item, showGit }) => (  
  <Pressable
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
        {showGit &&
          <Button 
            text="Open in Github"
            backgroundColor="primary" 
            style={styles.button}
          />
        }
      </View>
      {showGit && <View style={styles.separator} />}
    </View>
  </Pressable>
);

export default RepositoryItem;