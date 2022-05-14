import { Picker } from '@react-native-picker/picker';

const SortPicker = ({ sortPrinciple, setSortPrinciple }) => {
  const handlesetSortPrinciple = (sort) => {
    setSortPrinciple(sort);
  };

  return (
    <Picker
      selectedValue={sortPrinciple}
      onValueChange={(itemValue) =>
        handlesetSortPrinciple(itemValue)
    }>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default SortPicker;