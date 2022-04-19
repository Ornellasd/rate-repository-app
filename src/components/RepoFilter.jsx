import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const RepoFilter = ({ searchFilter, setSearchFilter }) => {
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

export default RepoFilter;