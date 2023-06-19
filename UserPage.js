import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as Notifications from 'expo-notifications';
import { MileageContext } from './MileageContext';

const UserPage = () => {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [message, setMessage] = useState('');
  const { mileage } = React.useContext(MileageContext);
  
  React.useEffect (() => {
    // Request necessary permissions for push notifications (if required)
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      // Handle notification permission denied
      console.log('Notification permission denied');
    }
  };

  const handleToggleAlarm = () => {
    setAlarmEnabled(!alarmEnabled);
    if (alarmEnabled) {
        handleResetTime();
      }
  };

  const handleSelectTime = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const formattedTime = moment(selectedTime).format('HH:mm');
      setSelectedTime(formattedTime);
      setAlarm(selectedTime); // Set alarm when time is selected
    }
    setShowTimePicker(false);
  };

  const handleResetTime = () => {
    if (selectedTime) {
      // Perform any additional actions here before saving the selected time
      // For example, you could make an API call to save the time on the server
      // Or update the state in a parent component

      // After performing the necessary actions, you can clear the selected time
      Notifications.cancelAllScheduledNotificationsAsync();
      setSelectedTime(null);
    }
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const setAlarm = (selectedTime) => {
    // Schedule the alarm based on the selected time
    const alarmTime = moment(selectedTime, 'HH:mm').toDate();
    
    // Schedule a local notification for the alarm
    Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm',
          body: message, // Display the message in the notification
        },
        trigger: {
          hour: alarmTime.getHours(),
          minute: alarmTime.getMinutes(),
          repeats: true, // Repeat the alarm every day
        },
      });
    };

    // Function to get the image source based on the mileage
  const getImageSource = (mileage) => {
    let imageSource = null;
      if(mileage < 0) {
      imageSource = require('./components/VeryBad.png');
    } else if (mileage >= 0 && mileage < 3) {
      imageSource = require('./components/Bad.png');
    } else if (mileage >= 3 && mileage < 5) {
      imageSource = require('./components/NotBad.png');
    } else if (mileage >= 5 && mileage < 10) {
        imageSource = require('./components/Normal.png');
    } else if (mileage >= 10 && mileage < 15) {
        imageSource = require('./components/Clean.png');
    } else if (mileage >= 20) {
      imageSource = require('./components/VeryClean.png');
    }
    return imageSource;
  };

  // Get the image source based on mileage
  const imageSource = getImageSource(mileage);

  return (
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Alarm</Text>
          <Switch value={alarmEnabled} onValueChange={handleToggleAlarm} />
          <Text>{alarmEnabled ? 'On' : 'Off'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.row}>
          <Text style={styles.selectedTime}>{selectedTime || 'Select Time'}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSelectTime}>
            <Text style={styles.buttonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime ? moment(selectedTime, 'HH:mm').toDate() : new Date()}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
        {selectedTime && (
          <TouchableOpacity style={styles.resetbutton} onPress={handleResetTime}>
            <Text style={styles.resetbuttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your message"
          value={message}
          onChangeText={handleMessageChange}
        />
      </View>

      <View style={styles.milesection}>
        <MileageContext.Consumer>
          {({ mileage }) => (
            <View>
              <Text style={styles.mileage}>Mileage: {mileage}</Text>
              <Image source={imageSource} style={styles.mileageImage} />
            </View>
          )}
        </MileageContext.Consumer>
      </View>

      {/* Add more components or UI elements here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 150,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  milesection: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedTime: {
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0BC904',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  resetbutton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetbuttonText: {
    color: '#0BC904',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  mileage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mileageImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default UserPage;
