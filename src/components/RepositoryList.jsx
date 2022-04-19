import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce/lib';
import { FlatList, View, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';

import useRepositories from '../hooks/useRepositories';

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
    shadowColor: '#000',
    elevation: 5,
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

const SortPicker = ({ sortPrinciple, setSortPrinciple }) => {
  const handlesetSortPrinciple = (sort) => {
    setSortPrinciple(sort);
  };

  return (
    <Picker
      selectedValue={sortPrinciple}
      onValueChange={(itemValue, itemIndex) =>
        handlesetSortPrinciple(itemValue)

    }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const RepoFilter = ({ searchFilter, setSearchFilter }) => {  
  const clearFilterText = () => {
    setSearchFilter('');
  };
  
  return (
    <View style={styles.filterInputContainer}>
      <Icon name="search1" size={20} color="#000" style={styles.searchIcon} />
      <TextInput 
        style={styles.filterInput} 
        onChangeText={value => setSearchFilter(value)}
        value={searchFilter}
      />
      {searchFilter.length > 0 &&
        <Pressable onPressIn={() => clearFilterText()}>
          <Icon name="close" size={20} color="#000" style={styles.closeIcon} />
        </Pressable>
      }
    </View>
  );
};

const Header = ({ sortPrinciple, setSortPrinciple, searchFilter, setSearchFilter }) => (
  <View>
    <RepoFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
    <SortPicker sortPrinciple={sortPrinciple} setSortPrinciple={setSortPrinciple} />
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { sortPrinciple, setSortPrinciple, searchFilter, setSearchFilter } = this.props;

    // ...

    return (
      <Header 
        sortPrinciple={sortPrinciple} 
        setSortPrinciple={setSortPrinciple}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter} 
      />
    );
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const determineSortVariables = (sortPrinciple) => {
  let sortVariables;

  switch(sortPrinciple) {
    case 'latest':
      sortVariables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      };
      break;
    case 'highest':
      sortVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };
      break;
    case 'lowest': 
      sortVariables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      };
      break;
  };

  return sortVariables;
};

const RepositoryList = () => {
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  const [searchFilter, setSearchFilter] = useState('');
  const [debouncedSearchFilter] = useDebounce(searchFilter, 1000);

  const sortVariables = determineSortVariables(sortPrinciple);

  const [queryVariables, setQueryVariables] = useState({...sortVariables});

  useEffect(() => {
    setQueryVariables({
      ...sortVariables,
      searchKeyword: debouncedSearchFilter.toLowerCase(),
    });
  }, [debouncedSearchFilter]);

  const { repositories } = useRepositories(queryVariables);

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      sortPrinciple={sortPrinciple} 
      setSortPrinciple={setSortPrinciple}
      setSearchFilter={setSearchFilter}
      searchFilter={searchFilter}
    />
  ); 
};

export default RepositoryList;