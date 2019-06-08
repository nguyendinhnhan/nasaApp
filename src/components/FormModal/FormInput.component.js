import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 15,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  labelWrapper: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 14
  },
  textInput: {
    fontSize: 16
  }
});

const FormInput = props => {
  const { label, value, onChangeText, isRequired } = props;
  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && (
          <Text style={[styles.label, { marginLeft: 10, color: 'red' }]}>
            *
          </Text>
        )}
      </View>
      {isRequired && !value && (
        <Text style={[styles.label, { color: 'red' }]}>
          This field is required
        </Text>
      )}
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  isRequired: PropTypes.bool
};

export default FormInput;
