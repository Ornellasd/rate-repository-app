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

export const RepositoryListContainer = ({ repositories, sortPrinciple, sortChange }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={() => <SortPicker sortPrinciple={sortPrinciple} sortChange={sortChange} />}
    />
  );
};

const SortPicker = ({ sortPrinciple, sortChange }) => {
  const handleSortChange = (sort) => {
    sortChange(sort);
  };

  return (
    <Picker
      selectedValue={sortPrinciple}
      onValueChange={(itemValue, itemIndex) =>
        handleSortChange(itemValue)

    }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  
  const sortChange = (selectedSort) => {
    setSortPrinciple(selectedSort);
  };

  return <RepositoryListContainer repositories={repositories} sortPrinciple={sortPrinciple} sortChange={sortChange} />; 
};

export default RepositoryList;