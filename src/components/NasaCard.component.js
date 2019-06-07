import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden'
  },
  imageCover: {
    width: '100%',
    height: 150
  },
  metaWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  metaText: {
    color: '#707070',
    fontSize: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5
  },
  description: {
    fontSize: 13,
    color: '#707070',
    margin: 5
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  labelButton: {
    flex: 3,
    fontSize: 12,
    color: '#707070',
    textAlign: 'center'
  },
  actionWrapper: {
    marginVertical: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  action: {
    marginHorizontal: 5,
    height: 50,
    width: 50,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
});

const NasaCard = props => {
  const { nasaData, addToNasaCollection, onRemove } = props;
  const nasaId = _.get(nasaData, 'data[0].nasa_id');
  const imageUri = { uri: _.get(nasaData, 'links[0].href') };
  const center = _.get(nasaData, 'data[0].center');
  const dateCreated = _.get(nasaData, 'data[0].date_created');
  const title = _.get(nasaData, 'data[0].title');
  const description = _.get(nasaData, 'data[0].description');
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.imageCover} source={imageUri} resizeMode="cover" />
        <View style={styles.metaWrapper}>
          <Text style={styles.metaText}>{center}</Text>
          <Text style={styles.metaText}>
            {moment(dateCreated).format('D MMM, YYYY')}
          </Text>
        </View>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={3} style={styles.description}>
          {description}
        </Text>
      </TouchableOpacity>
      {addToNasaCollection ? (
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => addToNasaCollection(nasaData)}
        >
          <Icon name="ios-add" size={30} />
          <Text style={styles.labelButton}>Add to NASA collection</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionWrapper}>
          <TouchableOpacity style={styles.action}>
            <Icon name="ios-heart-empty" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            onPress={() => onRemove(nasaId)}
          >
            <Icon name="ios-trash" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Icon name="ios-brush" size={30} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

NasaCard.propTypes = {
  nasaData: PropTypes.object.isRequired,
  addToNasaCollection: PropTypes.func,
  onRemove: PropTypes.func
};

export default NasaCard;
