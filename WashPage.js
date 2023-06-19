import React, { useContext, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MileageContext } from './MileageContext';

const WashPage = () => {
  const { mileage, setMileage } = useContext(MileageContext);

  const handleYesButtonPress = () => {
    setMileage(mileage + 1);
    Alert.alert('Earn mileage', 'Earned 1 mileage');
  };

  const handleNoButtonPress = () => {
    setMileage(mileage - 1);
    Alert.alert('Reduced mileage', 'Reduced 1 mileage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
      Finished washing your face?</Text>
      <Image source={require('./components/icon2.png')} style={styles.faceImage} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.Button} onPress={handleYesButtonPress}>
        <Text style={styles.ButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={handleNoButtonPress}>
        <Text style={styles.ButtonText}>No</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.mileage}>Mileage: {mileage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  faceImage: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  mileage: {
    fontSize: 18,
  },
  Button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6799FF',
    borderRadius: 5,
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WashPage;
