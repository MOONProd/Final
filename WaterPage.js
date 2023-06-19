import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function WaterPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadWaterCount();
  }, []);

  useEffect(() => {
    saveWaterCount();
  }, [count]);

  const loadWaterCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem('waterCount');
      if (storedCount !== null) {
        setCount(parseInt(storedCount));
      }
    } catch (error) {
      console.error('Error loading water count:', error);
    }
  };

  const saveWaterCount = async () => {
    try {
      await AsyncStorage.setItem('waterCount', count.toString());
    } catch (error) {
      console.error('Error saving water count:', error);
    }
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (count < 16) {
      setCount(count + 1);
    }
  };

  return (
    <View style={styles.waterPage}>
      <View style={styles.waterControls}>
        <TouchableOpacity onPress={decrementCount} style={styles.button}>
          <FontAwesome name="minus" size={70} color="black" />
        </TouchableOpacity>
        <MaterialIcons name="local-drink" size={150} color="#5CD1E5" />
        <TouchableOpacity onPress={incrementCount} style={styles.button}>
          <FontAwesome name="plus" size={70} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.waterIcon}>
        <Text style={styles.waterCount}>{count}/16 cup</Text>
      </View>
    </View>
  );
}

const styles = {
  waterPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterIcon: {
    marginBottom: 20,
  },
  waterCount: {
    fontSize: 30,
  },
  waterControls: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 20,
    marginTop: 35,
  },
};

export default WaterPage;

