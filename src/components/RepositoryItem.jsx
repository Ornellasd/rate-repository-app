import { View, StyleSheet, Pressable } from 'react-native';
import { Link, useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';

import { GET_REPOSITORY } from '../graphql/queries';

import RepositoryMetrics from './RepositoryMetrics';
import RepositoryInfo from './RepositoryInfo';
import Text from './Text';

import theme from '../theme';
import ReviewList from './ReviewList';

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
        <RepositoryInfo item={item} />
        <RepositoryMetrics item={item} />
        {showGit && <GithubButton />}
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
    <View>
        {/* <RepositoryItem item={data.repository} /> */}
        {/* <Pressable
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
        </Pressable> */}
      <ReviewList id={id} repository={data.repository} />
    </View>
  )
};

export default RepositoryItem;