import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SleepPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSelectHours = (hours) => {
    setSelectedHours(hours);
  };

  const handleConfirm = () => {
    if (selectedHours !== null) {
      setModalVisible(true);
      setPopupMessage(getPopupMessage(selectedHours));
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedHours(null);
    setPopupMessage('');
  };

  const getPopupMessage = (hours) => {
    if (hours >= 0 && hours <= 5) {
      return 'Please take enough sleep for good skin :(';
    } else if (hours >= 6 && hours <= 9) {
      return 'Your skin is getting better day by day :)';
    } else if (hours >= 10 && hours <= 13) {
      return 'Were you tired? Excessive sleep is bad for a healthy lifestyle. Please be careful.';
    } else {
      return '';
    }
  };

  return (
    <View style={styles.container}>
      {/* Sleep Icon */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="bedtime" size={150} color="#F2CB61" />
      </View>

      {/* Select number wheel */}
      <RNPickerSelect
        onValueChange={handleSelectHours}
        items={[
          { label: '   0 hour', value: 0 },
          { label: '   1 hour', value: 1 },
          { label: '   2 hours', value: 2 },
          { label: '   3 hours', value: 3 },
          { label: '   4 hours', value: 4 },
          { label: '   5 hours', value: 5 },
          { label: '   6 hours', value: 6 },
          { label: '   7 hours', value: 7 },
          { label: '   8 hours', value: 8 },
          { label: '   9 hours', value: 9 },
          { label: '   10 hours', value: 10 },
          { label: '   11 hours', value: 11 },
          { label: '   12 hours', value: 12 },
          { label: '   13 hours', value: 13 },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: '   Select hours', value: null }}
        value={selectedHours}
      />

      {/* Confirm button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      {/* Pop-up message */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{popupMessage}</Text>
            <TouchableOpacity
              style ={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    // Add your styles for the sleep icon container
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: 'gray',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SleepPage;

