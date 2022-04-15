import React from 'react';
import { useState } from 'react';
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

const RepoFilter = ({ searchFilter, filterChange }) => {
  const clearFilterText = () => {
    filterChange('');
  };

  return (
    <View style={styles.filterInputContainer}>
      <Icon name="search1" size={20} color="#000" style={styles.searchIcon} />
      <TextInput 
        style={styles.filterInput} 
        onChangeText={value => filterChange(value)} 
        value={searchFilter}
      />
      <Pressable onPressIn={() => clearFilterText()}>
        <Icon name="close" size={20} color="#000" style={styles.closeIcon} />
      </Pressable>
    </View>
  );
};

const Header = ({ sortPrinciple, sortChange, searchFilter, filterChange }) => (
  <View>
    <RepoFilter searchFilter={searchFilter} filterChange={filterChange} />
    <SortPicker sortPrinciple={sortPrinciple} sortChange={sortChange} />
  </View>
);

// export const RepositoryListContainer = ({ repositories, sortPrinciple, sortChange, searchFilter, filterChange, }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map(edge => edge.node)
//     : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={renderItem}
//       ListHeaderComponent={() => 
//         <Header 
//           sortPrinciple={sortPrinciple} 
//           sortChange={sortChange}
//           searchFilter={searchFilter}
//           filterChange={filterChange} 
//         />
//       }
//     />
//   );
// };

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { repositories, sortPrinciple, sortChange, searchFilter, filterChange } = this.props;

    // ...

    return (
      <Header 
        sortPrinciple={sortPrinciple} 
        sortChange={sortChange}
        searchFilter={searchFilter}
        filterChange={filterChange} 
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

const RepositoryList = () => {
  const [sortPrinciple, setSortPrinciple] = useState('latest');
  const [searchFilter, setSearchFilter] = useState('');

  console.log(searchFilter);

  const { repositories } = useRepositories(sortPrinciple);
  
  const sortChange = (selectedSort) => {
    setSortPrinciple(selectedSort);
  };

  const filterChange = (filter) => {
    setSearchFilter(filter);
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      sortPrinciple={sortPrinciple} 
      sortChange={sortChange}
      filterChange={setSearchFilter}
      searchFilter={searchFilter}
    />
  ); 
};

export default RepositoryList;