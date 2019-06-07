import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from './styles';
import {
  fetchLocalCollectionAction,
  removeNasaAction
} from '../../actions/collection.action';
import NasaCard from '../../components/NasaCard.component';

class Collection extends PureComponent {
  componentDidMount() {
    const { fetchLocalCollection } = this.props;
    fetchLocalCollection();
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    const data = JSON.parse(_.get(item, '[1]'));
    return (
      <NasaCard
        key={index}
        nasaData={data}
        onRemove={this._removeNasaToCollection}
      />
    );
  };

  _removeNasaToCollection = nasaId => {
    const { removeNasaToCollection } = this.props;
    removeNasaToCollection(nasaId);
  };

  render() {
    const { navigation, localCollection } = this.props;
    const nasas = _.get(localCollection, 'result');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nasa Collection</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="ios-add" size={40} color="#FFF" />
            <Text style={styles.text}>Add item</Text>
          </TouchableOpacity>
        </View>
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
  navigation: PropTypes.object,
  fetchLocalCollection: PropTypes.func,
  removeNasaToCollection: PropTypes.func,
  localCollection: PropTypes.object
};

const mapStateToProps = state => ({
  localCollection: state.collection.localCollection
});

const mapDispatchToProps = dispatch => ({
  fetchLocalCollection: () => dispatch(fetchLocalCollectionAction()),
  removeNasaToCollection: nasaId => dispatch(removeNasaAction(nasaId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
