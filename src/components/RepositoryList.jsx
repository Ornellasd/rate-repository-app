import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import useRepositories from '../hooks/useRepositories';

import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const renderItem = ({ item }) => (
  <RepositoryItemContainer item={item} />
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
      ListHeaderComponent={() => <SortPicker />}
    />
  );
};

const SortPicker = () => {
  const [sortPrinciple, setSortPrinciple] = useState('latest');

  return (
    <Picker
      selectedValue={sortPrinciple}
      onValueChange={(itemValue, itemIndex) =>
        setSortPrinciple(itemValue)
    }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return <RepositoryListContainer repositories={repositories} />; 
};

export default RepositoryList;