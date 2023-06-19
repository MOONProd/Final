import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./icon2.png')} // Replace with the actual path to your image
        style={styles.image}
      />
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default LoadingScreen;
