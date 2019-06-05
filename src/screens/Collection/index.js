import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

class Collection extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.text}>{'Search >>'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>CollectionScreen</Text>
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
