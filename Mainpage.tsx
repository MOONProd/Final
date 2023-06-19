import { addDays, format, getDate, isSameDay, startOfWeek } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};

type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

const Mainpage: React.FC<Props> = ({ date, onChange }) => {
  const [week, setWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  const RoutineList: React.FC = () => {
    const [routineItems, setRoutineItems] = useState<RoutineItem[]>([]);
    const [newItemText, setNewItemText] = useState<string>('');
    const [showHiddenItems, setShowHiddenItems] = useState(false);

    const addRoutineItem = () => {
      if (newItemText.trim() !== '') {
        setRoutineItems([
          ...routineItems,
          { text: newItemText, completed: false },
        ]);
        setNewItemText('');
      }
    };
    

    const toggleCompletion = (index: number) => {
      const updatedItems = [...routineItems];
      updatedItems[index].completed = !updatedItems[index].completed;
      setRoutineItems(updatedItems);
    };

    const removeRoutineItem = (index: number) => {
      const updatedItems = [...routineItems];
      updatedItems.splice(index, 1);
      setRoutineItems(updatedItems);
    };

    const modifyRoutineItem = (index: number, newText: string) => {
      const updatedItems = [...routineItems];
      updatedItems[index].text = newText;
      setRoutineItems(updatedItems);
    };

    const visibleRoutineItems = routineItems.slice(0, 10);
    const hiddenRoutineItems = routineItems.slice(10);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="tint" size={30} color="blue" />
            <Text style={styles.iconText}>Water</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="bed" size={30} color="purple" />
            <Text style={styles.iconText}>Sleep</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="shower" size={30} color="green" />
            <Text style={styles.iconText}>Wash</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      );
    };

    /* const MenuBar: React.FC = () => {

      return (
        <View style={styles.menuBarContainer}>
          <TouchableOpacity style={styles.menuBarItem}>
            <FontAwesome name="calendar" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBarItem}>
            <FontAwesome name="plus" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBarItem}>
            <FontAwesome name="user" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      );
    }; */
  
    return (
      <View style={styles.container}>
        <View style={styles.weekCalendarContainer}>
          {week.map((weekDay) => {
            const textStyles = [styles.label];
            const touchable = [styles.touchable];
  
            const sameDay = isSameDay(weekDay.date, date);
            if (sameDay) {
              textStyles.push(styles.selectedLabel);
              touchable.push(styles.selectedTouchable);
            }
  
            return (
              <View style={styles.weekDayItem} key={weekDay.formatted}>
                <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
                <TouchableOpacity
                  onPress={() => onChange(weekDay.date)}
                  style={touchable}
                >
                  <Text style={textStyles}>{weekDay.day}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <RoutineList />
        {/* <MenuBar /> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
      flex: 1,
      paddingVertical: 20,
    },
    weekCalendarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    weekDayText: {
      color: 'gray',
      marginBottom: 5,
    },
    label: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center',
    },
    selectedLabel: {
      color: 'white',
    },
    touchable: {
      borderRadius: 20,
      padding: 7.5,
      height: 35,
      width: 35,
    },
    selectedTouchable: {
      backgroundColor: 'green',
    },
    weekDayItem: {
      alignItems: 'center',
    },
    routineListContainer: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    routineListHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    routineInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    viewMoreButton: {
        alignSelf: 'center',
        marginTop: 10,
    },
    viewMoreButtonText: {
        color: 'blue',
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginRight: 10,
      paddingHorizontal: 10,
    },
    addButton: {
      backgroundColor: 'green',
      borderRadius: 5,
      padding: 10,
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
      fontSize: 16,
    },
    completedRoutineText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
    removeButton: {
      backgroundColor: 'gray',
      borderRadius: 5,
      padding: 5,
    },
    hiddenItemsContainer: {
        maxHeight: 200,
        marginTop: 10,
    },
 /*    menuBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: 'gray',
      paddingVertical: 20,
    }, */
/*     menuBarItem: {
      alignItems: 'center',
    }, */
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 100,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    icon: {
      alignItems: 'center',
    },
    iconText: {
      marginTop: 5,
    },
  });
  
  // get week days
  export const getWeekDays = (date: Date): WeekDay[] => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const final = [];
  
    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(start, i);
      final.push({
        formatted: format(currentDate, 'EEE'),
        date: currentDate,
        day: getDate(currentDate),
      });
    }
  
    return final;
  };
  
  
  export default Mainpage;