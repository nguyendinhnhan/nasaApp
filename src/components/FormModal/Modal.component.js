import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
    paddingHorizontal: 25,
    justifyContent: 'center',
    borderRadius: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  closeButton: {
    padding: 10
  },
  saveButton: {
    backgroundColor: '#7864AE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  labelButton: {
    color: '#FFF',
    fontSize: 20
  }
});

const FormModal = props => {
  const { isVisible, children, onClose, onSave } = props;
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="ios-close" size={40} />
          </TouchableOpacity>
        </View>
        {children}
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Icon name="ios-checkmark" size={40} color="#FFF" />
          <Text style={styles.labelButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

FormModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

export default FormModal;
