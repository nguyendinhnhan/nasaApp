import React from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dbdbdb'
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 7,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'transparent'
  }
};

const SearchBox = props => {
  const { query, onChangeText } = props;
  return (
    <View style={styles.container}>
      <Icon name="ios-search" size={30} />
      <TextInput
        style={styles.searchInput}
        placeholder="Type something to search..."
        placeholderTextColor="#d8d8d8"
        returnKeyType="done"
        underlineColorAndroid="transparent"
        onSubmitEditing={() => Keyboard.dismiss()}
        onChangeText={text => onChangeText(text)}
        value={query}
      />
    </View>
  );
};

SearchBox.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default SearchBox;
