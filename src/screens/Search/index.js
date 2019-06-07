import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { searchNasaAction } from '../../actions/nasa.action';
import SearchBox from '../../components/SearchBox.component';
import NasaCard from '../../components/NasaCard.component';
import { NASA_COLLECTION } from '../../constants/appConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  nasasContainer: {
    marginTop: 20
  }
});

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.debounceSearch = _.debounce(this.searchByQuery, 600);
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

  _storeData = async item => {
    const nasaData = _.get(item, 'item');
    const nasaId = _.get(nasaData, 'data[0].nasa_id');

    try {
      let collection = await AsyncStorage.getItem(NASA_COLLECTION);
      collection = _.concat(JSON.parse(collection) || [], nasaId);
      const firstPair = [NASA_COLLECTION, JSON.stringify(collection)];
      const secondPair = [nasaId, JSON.stringify(nasaData)];
      await AsyncStorage.multiSet([firstPair, secondPair]);
    } catch (error) {
      console.log('error', error);
    }
  };

  _addToNasaCollection = item => {
    this._storeData(item);
  };

  _onChangeQuerySearch = text => {
    this.setState({ query: text });
    this.debounceSearch(text);
  };

  searchByQuery = text => {
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
          <Text style={styles.text}>{'<< Go Collection'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>SearchScreen</Text>
        <SearchBox query={query} onChangeText={this._onChangeQuerySearch} />
        <FlatList
          style={styles.nasasContainer}
          showsVerticalScrollIndicator={false}
          data={nasas}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

Search.propTypes = {
  searchNasa: PropTypes.func,
  nasaFeed: PropTypes.object,
  navigation: PropTypes.object
};

const mapStateToProps = state => ({
  nasaFeed: state.nasa.feed
});

const mapDispatchToProps = dispatch => ({
  searchNasa: query => dispatch(searchNasaAction(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
