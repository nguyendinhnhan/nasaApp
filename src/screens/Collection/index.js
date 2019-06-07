import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { searchData } from '../../helpers/mockData';
import NasaCard from '../../components/NasaCard.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 25
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

class Collection extends PureComponent {
  _keyExtractor = (item, index) => index.toString();

  _renderItem = (item, index) => {
    return <NasaCard key={index} nasaData={item} />;
  };

  render() {
    const { navigation } = this.props;
    const nasas = _.get(searchData, 'collection.items');
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.text}>{'Search >>'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>CollectionScreen</Text>
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

Collection.propTypes = {
  navigation: PropTypes.object
};

export default connect(
  null,
  null
)(Collection);
