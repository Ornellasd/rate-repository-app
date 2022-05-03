import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce/lib';
import { FlatList, View, StyleSheet, Text } from 'react-native';

// import useRepositories from '../hooks/useRepositories';
import useRepositories from '../hooks/useRepositoriesNEW';

import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import RepoFilter from './RepoFilter';
import SortPicker from './SortPicker';

const styles = StyleSheet.create({

});

const renderItem = ({ item }) => (
  <View>
    <RepositoryItemContainer item={item} />
  </View>
);

const Header = ({ sortPrinciple, setSortPrinciple, searchFilter, setSearchFilter }) => (
  <View>
    <RepoFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
    <SortPicker sortPrinciple={sortPrinciple} setSortPrinciple={setSortPrinciple} />
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortPrinciple, setSortPrinciple, searchFilter, setSearchFilter } = this.props;

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
    const { data } = this.props;

    const repositoryNodes = data && data.repositories
      ? data.repositories.edges.map(edge => edge.node)
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
  const [debouncedSearchFilter] = useDebounce(searchFilter, 500);

  const { repositories } = useRepositories({
    searchKeyword: debouncedSearchFilter,
  });

  return (
    <RepositoryListContainer 
      data={repositories} 
      sortPrinciple={sortPrinciple} 
      setSortPrinciple={setSortPrinciple}
      setSearchFilter={setSearchFilter}
      searchFilter={searchFilter}
    />
  ); 
  return <Text>DERP</Text>;
};

export default RepositoryList;