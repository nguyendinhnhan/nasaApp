import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './styles';
import { searchNasaAction } from '../../actions/nasa.action';
import { addNasaAction } from '../../actions/collection.action';
import SearchBox from '../../components/SearchBox.component';
import NasaCard from '../../components/NasaCard.component';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.debounceSearch = _.debounce(this._searchByQuery, 400);
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    return (
      <NasaCard
        key={index}
        nasaData={item}
        addToNasaCollection={this._addToNasaCollection}
      />
    );
  };

  _renderNoResult = () => <Text style={styles.noResult}>No NASA found</Text>;

  _addToNasaCollection = item => {
    const { addNasaToCollection } = this.props;
    addNasaToCollection(item);
  };

  _onChangeQuerySearch = text => {
    this.setState({ query: text });
    this.debounceSearch(text);
  };

  _searchByQuery = text => {
    const { searchNasa } = this.props;
    searchNasa(text);
  };

  render() {
    const { query } = this.state;
    const { nasaFeed, navigation } = this.props;
    const nasas = _.get(nasaFeed, 'result.items');

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.text}>{'< Back to Collection'}</Text>
        </TouchableOpacity>
        <SearchBox query={query} onChangeText={this._onChangeQuerySearch} />
        <FlatList
          style={styles.nasasContainer}
          showsVerticalScrollIndicator={false}
          data={nasas}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderNoResult}
        />
      </View>
    );
  }
}

Search.propTypes = {
  searchNasa: PropTypes.func,
  addNasaToCollection: PropTypes.func,
  nasaFeed: PropTypes.object,
  navigation: PropTypes.object
};

const mapStateToProps = state => ({
  nasaFeed: state.nasa.feed
});

const mapDispatchToProps = dispatch => ({
  searchNasa: query => dispatch(searchNasaAction(query)),
  addNasaToCollection: nasa => dispatch(addNasaAction(nasa))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
