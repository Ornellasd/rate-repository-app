import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce/lib';
import { FlatList, View, ActivityIndicator } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItemContainer from './RepositoryItem';
import ItemSeparator from './ItemSeparator';
import RepoFilter from './RepoFilter';
import SortPicker from './SortPicker';

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
    const { repositories, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
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
  
  const { repositories, fetchMore } = useRepositories({
    first: 4,
    ...determineSortVariables(sortPrinciple),
    searchKeyword: debouncedSearchFilter,
  });

  if(!repositories) {
    return (
      <View style={{ flexGrow: 1, top: '40%' }}>
        <ActivityIndicator size="large" color="#00000" />
      </View>
    );
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      sortPrinciple={sortPrinciple} 
      setSortPrinciple={setSortPrinciple}
      setSearchFilter={setSearchFilter}
      searchFilter={searchFilter}
      onEndReach={onEndReach}
    />
  ); 
};

export default RepositoryList;