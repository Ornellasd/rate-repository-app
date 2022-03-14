import { View, StyleSheet, Pressable } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: 10,
    // marginBottom: 5,
  },
  // REFACTOR BUTTON STYLES ELSWEWHERE(POSSIBLY itemContainer as well!)
  button: {
    height: theme.formFields.height,
    borderRadius: theme.formFields.borderRadius,
    backgroundColor: theme.colors.buttonPrimary,
    alignItems: 'center',
    justifyContent: 'center'
  }
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

  console.log(data.repository);

  return (
    <View style={styles.itemContainer}>
      <RepositoryItem item={data.repository} />
      <Pressable
        style={styles.button}      
      >
        <Text
          color="title"
          fontWeight="bold"
          fontSize="subheading"
        >
          Open in GitHub
          </Text>
      </Pressable>
    </View>
  )
};

export default RepositoryItem;