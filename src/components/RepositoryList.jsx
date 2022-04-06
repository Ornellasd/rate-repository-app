import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import useRepositories from '../hooks/useRepositories';

import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const renderItem = ({ item }) => (
  <View>
    <RepositoryItemContainer item={item} />
  </View>
);

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
}

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  console.log(sortPrinciple);

  return (
    <View>
      <Picker
        selectedValue={sortPrinciple}
        onValueChange={(itemValue, itemIndex) =>
          setSortPrinciple(itemValue)
      }>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest Rated" value="highest" />
        <Picker.Item label="Lowest Rated" value="lowest" />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </View>
  )
};

export default RepositoryList;