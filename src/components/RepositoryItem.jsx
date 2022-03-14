import { View, StyleSheet, Pressable } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

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
  },
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

  return (
    <View style={styles.itemContainer}>
      <RepositoryItem item={data.repository} />
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
    </View>
  )
};

export default RepositoryItem;