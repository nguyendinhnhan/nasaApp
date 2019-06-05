import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { searchNasaAction } from '../../actions/nasa.action';

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

class Search extends PureComponent {
  componentDidMount() {
    const { searchNasa } = this.props;
    searchNasa();
  }

  render() {
    const { nasaFeed, navigation } = this.props;
    const title = _.get(nasaFeed, 'result.title');

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.text}>{'<< Go Collection'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>SearchScreen</Text>
        <Text style={styles.text}>{title}</Text>
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
  searchNasa: () => dispatch(searchNasaAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
