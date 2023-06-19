import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const CalendarPage = ({ }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
  };

  const markedDates = {
    [selectedDate]: { selected: true, marked: true }
  };

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.headerText}>Calendar</Text>
        <Text>Selected Date: {selectedDate}</Text>
        <View style={styles.calendarContainer}>
          <Calendar onDayPress={handleDateSelection} markedDates={markedDates} />
        </View>
      </View>
      <View>
    </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  block: {
    width: windowWidth,
    height: windowHeight,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  calendarContainer: {
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 3/4,
  },
});

export default CalendarPage;