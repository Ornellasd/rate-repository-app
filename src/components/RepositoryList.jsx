import { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';

import useRepositories from '../hooks/useRepositories';

// import TextInput from './TextInput';


import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  filterInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    borderRadius: 4,

  },
  filterInput: {
    flex: 1,
  },
  searchIcon: {
    paddingRight: 20,
  },
  closeIcon: {
    paddingLeft: 20,
  }
});

const renderItem = ({ item }) => (
  <View>
    <RepositoryItemContainer item={item} />
  </View>
);

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

const RepoFilter = () => {
  return (
    <View style={styles.filterInputContainer}>
      <Icon name="search1" size={20} color="#000" style={styles.searchIcon} />
      <TextInput style={styles.filterInput} />
      <Icon name="close" size={20} color="#000" style={styles.closeIcon} />
    </View>
  );
};

const Header = ({ sortPrinciple, sortChange }) => (
  <View>
    <RepoFilter />
    <SortPicker sortPrinciple={sortPrinciple} sortChange={sortChange} />
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
      ListHeaderComponent={() => <Header sortPrinciple={sortPrinciple} sortChange={sortChange} />}
    />
  );
};

const RepositoryList = () => {
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  const { repositories } = useRepositories(sortPrinciple);
  
  const sortChange = (selectedSort) => {
    setSortPrinciple(selectedSort);
  };

  return <RepositoryListContainer repositories={repositories} sortPrinciple={sortPrinciple} sortChange={sortChange} />; 
};

export default RepositoryList;