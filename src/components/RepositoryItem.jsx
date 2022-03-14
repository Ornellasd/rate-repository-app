import { View, StyleSheet, Text } from 'react-native';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';
import { Link, useParams } from 'react-router-native';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    // marginBottom: 5,
  },
});

// export const RepoTest = ({ id }) => (
//   <>
//     <Text>REPO DERP</Text>
//   </>
// );

export const RepoExpanded = () => {
  const { id } = useParams();

  console.log(id); 

  return (
    <>
      <Text>Repo: {id}</Text>
    </>
  )
};

const RepositoryItem = ({ item }) => {
  return (
    <Link to={`/repository/${item.id}`}>
      <View style={styles.itemContainer}>
        <RepositoryInfo item={item} />
        <RepositoryMetrics item={item} />
      </View>
    </Link>
  
  );
};

export default RepositoryItem;