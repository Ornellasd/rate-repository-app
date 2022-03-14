import { View, StyleSheet, Text } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    // marginBottom: 5,
  },
});

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

export const SingleRepository = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return null;
  if (error) console.log(`ERROR!: ${error}`);

  console.log(data);

  return (
    <>
      <Text>Repo: {id}</Text>
    </>
  )
};

export default RepositoryItem;