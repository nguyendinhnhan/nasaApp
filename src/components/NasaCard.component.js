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
  }
});

const NasaCard = props => {
  const { nasaData } = props;
  const imageUri = { uri: _.get(nasaData, 'item.links[0].href') };
  const center = _.get(nasaData, 'item.data[0].center');
  const dateCreated = _.get(nasaData, 'item.data[0].date_created');
  const title = _.get(nasaData, 'item.data[0].title');
  const description = _.get(nasaData, 'item.data[0].description');
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
      <TouchableOpacity style={styles.buttonWrapper}>
        <Icon name="ios-add" size={30} />
        <Text style={styles.labelButton}>Add to NASA collection</Text>
      </TouchableOpacity>
    </View>
  );
};

NasaCard.propTypes = {
  nasaData: PropTypes.object.isRequired
};

export default NasaCard;
