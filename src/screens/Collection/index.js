import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from './styles';
import {
  fetchLocalCollectionAction,
  favoriteNasaAction,
  removeNasaAction,
  updateNasaAction
} from '../../actions/collection.action';
import NasaCard from '../../components/NasaCard.component';
import FormModal from '../../components/FormModal/Modal.component';
import FormInput from '../../components/FormModal/FormInput.component';

class Collection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      nasaId: '',
      title: '',
      description: '',
      imageUrl: ''
    };
  }

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
        onFavorite={this._toogleFavorite}
        onRemove={this._removeNasaToCollection}
        onUpdate={this._showFormData}
      />
    );
  };

  _renderNoResult = () => (
    <Text style={styles.noResult}>No NASA in Collection</Text>
  );

  _toogleFavorite = (nasaId, isFavorite) => {
    const { favoriteNasaOfCollection } = this.props;
    favoriteNasaOfCollection({ nasaId, isFavorite });
  };

  _showFormData = nasaData => {
    const nasaId = _.get(nasaData, 'data[0].nasa_id');
    const imageUrl = _.get(nasaData, 'links[0].href');
    const title = _.get(nasaData, 'data[0].title');
    const description = _.get(nasaData, 'data[0].description');

    this.setState({ nasaId, imageUrl, title, description, visibleModal: true });
  };

  _updateNasafromCollection = () => {
    const { updateNasaFromCollection } = this.props;
    const { nasaId, title, description, imageUrl } = this.state;

    if (imageUrl) {
      this.setState({ visibleModal: false });
      updateNasaFromCollection({
        title,
        id: nasaId,
        description,
        imageUrl
      });
    }
  };

  _removeNasaToCollection = nasaId => {
    const { removeNasaToCollection } = this.props;
    removeNasaToCollection(nasaId);
  };

  render() {
    const { navigation, localCollection } = this.props;
    const { visibleModal, title, description, imageUrl } = this.state;
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
          ListEmptyComponent={this._renderNoResult}
        />
        <FormModal
          isVisible={visibleModal}
          onSave={this._updateNasafromCollection}
          onClose={() => this.setState({ visibleModal: false })}
        >
          <FormInput
            label="Title"
            value={title}
            onChangeText={text => this.setState({ title: text })}
          />
          <FormInput
            label="Description"
            value={description}
            onChangeText={text => this.setState({ description: text })}
          />
          <FormInput
            label="Link image url"
            value={imageUrl}
            isRequired
            onChangeText={text => this.setState({ imageUrl: text })}
          />
        </FormModal>
      </View>
    );
  }
}

Collection.propTypes = {
  navigation: PropTypes.object,
  fetchLocalCollection: PropTypes.func,
  favoriteNasaOfCollection: PropTypes.func,
  removeNasaToCollection: PropTypes.func,
  updateNasaFromCollection: PropTypes.func,
  localCollection: PropTypes.object
};

const mapStateToProps = state => ({
  localCollection: state.collection.localCollection
});

const mapDispatchToProps = dispatch => ({
  fetchLocalCollection: () => dispatch(fetchLocalCollectionAction()),
  favoriteNasaOfCollection: data => dispatch(favoriteNasaAction(data)),
  removeNasaToCollection: nasaId => dispatch(removeNasaAction(nasaId)),
  updateNasaFromCollection: item => dispatch(updateNasaAction(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);
