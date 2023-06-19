import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addDays, format, getDate, isSameDay, startOfWeek } from 'date-fns';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPage from './CalendarPage';
import UserPage from './UserPage';
import WaterPage from './WaterPage';
import SleepPage from './SleepPage.js';
import WashPage from './WashPage';
import { MileageProvider } from './MileageContext';
import LoadingScreen from './components/LoadingScreen';

const Stack = createStackNavigator();

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [routineItems, setRoutineItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    
    const weekDays = getWeekDays(selectedDate);
    setWeek(weekDays);

    // 저장된 루틴 리스트 불러오기
    loadRoutineItems();
  }, [selectedDate]);

  useEffect(() => {
    // 루틴 리스트가 변경될 때마다 저장하기
    saveRoutineItems(routineItems);
    setTimeout(() => { // Delay the change of the loading state by 2 seconds
      setLoading(false);
    }, 2000);
  }, [routineItems]);

  const [week, setWeek] = useState([]);

  const saveRoutineItems = async (routineItems) => {
    try {
      if (routineItems !== undefined) {
        await AsyncStorage.setItem('routineItems', JSON.stringify(routineItems));
        console.log('Saving routine items:', routineItems);
      } else {
        // Handle the case when items are undefined or null
        await AsyncStorage.removeItem('routineItems');
      }
    } catch (error) {
      console.log('Failed to save routine items:', error);
    }
  };
  
  const loadRoutineItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('routineItems');
      const parsedItems = storedItems ? JSON.parse(storedItems) : [];
      setRoutineItems(parsedItems);
    } catch (error) {
      console.log('Failed to load routine items:', error);
    }
  };
  
  const RoutineList = () => {
    const [routineItems, setRoutineItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');
    const [showHiddenItems, setShowHiddenItems] = useState(false);

    useEffect(() => {
      // Load routine items when the component mounts
      loadRoutineItems();
    }, []);
  
    const loadRoutineItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('routineItems');
        const parsedItems = storedItems ? JSON.parse(storedItems) : [];
        setRoutineItems(parsedItems);
      } catch (error) {
        console.log('Failed to load routine items:', error);
      }
    };
  
    const addRoutineItem = () => {
      if (newItemText.trim() !== '') {
        const newItem = { text: newItemText, completed: false };
        setRoutineItems([...routineItems, newItem]);
        setNewItemText('');
    
        // Save the updated routine items to AsyncStorage
        saveRoutineItems([...routineItems, newItem]);
      }
    };
    

    const toggleCompletion = (index) => {
      const updatedItems = [...routineItems];
      updatedItems[index].completed = !updatedItems[index].completed;
      setRoutineItems(updatedItems);
    };

    const removeRoutineItem = (index) => {
      const updatedItems = [...routineItems];
      updatedItems.splice(index, 1);
      setRoutineItems(updatedItems);
    };

    const modifyRoutineItem = (index, newText) => {
      const updatedItems = [...routineItems];
      updatedItems[index].text = newText;
      setRoutineItems(updatedItems);
    };

    const visibleRoutineItems = routineItems.slice(0, 10);
    const hiddenRoutineItems = routineItems.slice(10);

    const navigation = useNavigation();
    const handleWaterPress = () => {
      navigation.navigate('WaterPage');
    };
    const handleSleepPress = () => {
      navigation.navigate('SleepPage');
    };
    const handleWashPress = () => {
      navigation.navigate('WashPage');
    };

    return (
      <View style={styles.container}>
        <View style={styles.weekCalendarContainer}>
        {week.map((weekDay) => {
          const textStyles = [styles.label];
          const touchable = [styles.touchable];

          const sameDay = isSameDay(weekDay.date, selectedDate);
          if (sameDay) {
            textStyles.push(styles.selectedLabel);
            touchable.push(styles.selectedTouchable);
          }

          return (
            <View style={styles.weekDayItem} key={weekDay.formatted}>
              <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
              <TouchableOpacity onPress={() => setSelectedDate(weekDay.date)} style={touchable}>
                <Text style={textStyles}>{weekDay.day}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
        <View style={styles.routineListContainer}>
          <Text style={styles.routineListHeading}>Routine List</Text>
          <View style={styles.routineInputContainer}>
            <TextInput
              value={newItemText}
              onChangeText={setNewItemText}
              placeholder="Add a routine item"
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={addRoutineItem}>
              <FontAwesome5 name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
          {visibleRoutineItems.map((item, index) => (
            <View style={styles.routineItem} key={index}>
              <TouchableOpacity
                style={styles.completionButton}
                onPress={() => toggleCompletion(index)}
              >
                <FontAwesome5
                  name={item.completed ? 'check-square' : 'square'}
                  size={18}
                  color={item.completed ? 'green' : 'gray'}
                />
              </TouchableOpacity>
              <TextInput
                value={item.text}
                onChangeText={(newText) => modifyRoutineItem(index, newText)}
                style={styles.routineText}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeRoutineItem(index)}
              >
                <FontAwesome5 name="trash-alt" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          {hiddenRoutineItems.length > 0 && (
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={() => setShowHiddenItems(!showHiddenItems)}
              >
                <Icon name={showHiddenItems ? 'angle-up' : 'angle-down'} size={20} color="green" />
              </TouchableOpacity>
            )}
            {showHiddenItems && (
              <ScrollView style={styles.hiddenItemsContainer}>
                <View>
                  {hiddenRoutineItems.map((item, index) => (
                    <View style={styles.routineItem} key={index}>
                      <TouchableOpacity
                        style={styles.completionButton}
                        onPress={() => toggleCompletion(index)}
                      >
                        <FontAwesome5
                          name={item.completed ? 'check-square' : 'square'}
                          size={18}
                          color={item.completed ? 'green' : 'gray'}
                        />
                      </TouchableOpacity>
                      <TextInput
                        value={item.text}
                        onChangeText={(newText) => modifyRoutineItem(index, newText)}
                        style={styles.routineText}
                      />
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeRoutineItem(index)}
                      >
                        <FontAwesome5 name="trash-alt" size={18} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>         
            )}
          </View>
          <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.iconButton} onPress={handleWaterPress}>
              <FontAwesome name="tint" size={30} color="blue" />
              <Text style={styles.iconText}>Water</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleSleepPress}>
              <FontAwesome name="bed" size={30} color="purple" />
              <Text style={styles.iconText}>Sleep</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleWashPress}>
              <FontAwesome name="shower" size={30} color="green" />
              <Text style={styles.iconText}>Wash</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      );
    };
  
    const MenuBar = () => {
      const navigation = useNavigation();
    
      const goToCalendarPage = () => {
        navigation.navigate('CalendarPage');
      };
      const goToAppPage = () => {
        navigation.navigate('RoutineList');
      };
      const goToUserPage = () => {
        navigation.navigate('UserPage');
      }
    
    
      return (
        <View style={styles.menuBarContainer}>
          <TouchableOpacity style={styles.menuBarItem} onPress={goToCalendarPage}>
            <FontAwesome name="calendar" size={25} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBarItem} onPress={goToAppPage}>
            <FontAwesome name="home" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBarItem} onPress={goToUserPage}>
            <FontAwesome name="user" size={25} color="gray" />
          </TouchableOpacity>
        </View>
      );
    };
    
  
    const getWeekDays = (date) => {
      const start = startOfWeek(date, { weekStartsOn: 1 });
      const final = [];
  
      for (let i = 0; i < 7; i++) {
        const date = addDays(start, i);
        final.push({
          formatted: format(date, 'EEE'),
          date,
          day: getDate(date),
        });
      }
  
      return final;
    };
  
    return (
      <MileageProvider>
        {loading ? ( // Conditional rendering based on the loading state
        <LoadingScreen />
      ) : (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="RoutineList" component={RoutineList} options={{ headerShown: false }} />
            <Stack.Screen name="CalendarPage" component={CalendarPage} options={{ headerShown: false }} />
            <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false}} />
            <Stack.Screen name="WaterPage" component={WaterPage} options={{ headerShown: false}} />
            <Stack.Screen name="SleepPage" component={SleepPage} options={{ headerShown: false}} />
            <Stack.Screen name="WashPage" component={WashPage} options={{ headerShown: false}} />
          </Stack.Navigator>
          <MenuBar />
      </NavigationContainer>
      )}
      </MileageProvider>
    );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekCalendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 60,
  },
  weekDayItem: {
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 16,
    fontWeight: 'thin',
  },
  label: {
    fontSize: 15,
    fontWeight: 'thin',
    color: 'black',
  },
  selectedLabel: {
    color: 'green',
  },
  touchable: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  selectedTouchable: {
    backgroundColor: 'lightgreen',
  },
  scrollContainer: {
    //paddingBottom: 100,
    flex: 1,
  },
  unscrollableContainer: {
    flex: 1,
  },
  routineListContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  routineListHeading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  routineInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  routineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  completionButton: {
    marginRight: 10,
  },
  routineText: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  hiddenItemsContainer: {
    maxHeight: 200,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 150,
  },
  iconButton: {
    alignItems: 'center',
    paddingTop: 50,
  },
  icon: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
  },
  menuBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: 'white',
    paddingVertical: 30,
  },
  menuBarItem: {
    alignItems: 'center',
  },
});

export default App;