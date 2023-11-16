import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Backbutton from '../../Component/Backbutton';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const Filterscreen = ({navigation}) => {
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false); 
    const [inputDateValue, setInputDateValue] = useState('');

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
    };

    const handleSelectRating = (rating) => {
        setSelectedRating(rating);
    };
    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
          if (startDate === null) {
            setStartDate(selectedDate);
          } else if (endDate === null) {
            if (selectedDate >= startDate) {
              setEndDate(selectedDate);
              setShowDatePicker(false);
            }
          } else {
            setStartDate(selectedDate);
            setEndDate(null);
          }
        }
      
        if (startDate && endDate) {
          const formattedDate = `${formatDate(startDate)} - ${formatDate(endDate)}`;
          setInputDateValue(formattedDate);
        } else if (startDate) {
          setInputDateValue(formatDate(startDate));
        } else {
          setInputDateValue(''); 
        }
      };
    

    const formatDate = (date) => {
        if (date) {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }
        return '';
    };

  const ratingOptions = [
    { value: 1.0, image: require('../../Assets/star.png') },
    { value: 2.0, image: require('../../Assets/star.png') },
    { value: 3.0, image: require('../../Assets/star.png') },
    { value: 4.0, image: require('../../Assets/star.png') },
    { value: 5.0, image: require('../../Assets/star.png') },
  ];

  const availableOptions = [
    { id: 1, label: '9 am - 12 pm' },
    { id: 2, label: '12 pm - 3 pm' },
    { id: 3, label: '3 pm - 6 pm' },
    { id: 4, label: '6 pm - 9 pm' },
];

const toggleOption = (optionId) => {
    if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
        setSelectedOptions([...selectedOptions, optionId]);
    }
};

const handleReset = () => {
    setSelectedGender(null);
    setSelectedRating(null);
    setStartDate(null);
    setEndDate(null);
    setSelectedOptions([]);
};

const handleApply = () => {
    navigation.goBack();

};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Filters</Text>
      </View>

      <View style={{ margin: 10, flexDirection: 'column'}}>
        <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Gender</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.genderButton, selectedGender === 'male' && styles.selectedButton]}
            onPress={() => handleSelectGender('male')}
          >
            <Text style={[styles.buttonText, selectedGender === 'male' && styles.selectedText]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, selectedGender === 'female' && styles.selectedButton]}
            onPress={() => handleSelectGender('female')}
          >
            <Text style={[styles.buttonText, selectedGender === 'female' && styles.selectedText]}>Female</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Rating</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {ratingOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[styles.ratingButton, selectedRating === option.value && styles.selectedButton]}
              onPress={() => handleSelectRating(option.value)}
            >
              <Image source={option.image} style={styles.starImage} />
              <Text style={[styles.buttonText, selectedRating === option.value && styles.selectedText]}>
                {option.value.toFixed(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Select Date Range</Text>
        </View>

        <View style={styles.datePicker}>
                 <View style={styles.inputContainer}>
                 <TextInput
                    style={styles.dateText}
                    placeholder="Select Date Range"
                    value={inputDateValue}
                    onFocus={() => setShowDatePicker(true)}
                    />
                        <Icon
                            name="calendar-outline"
                            size={24}
                            color="#000" 
                            style={styles.dateIcon}
                            onPress={() => setShowDatePicker(true)}
                        />
                    </View>
                    {showDatePicker && (
                    <DateTimePicker
                        value={startDate || new Date()} 
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                    )}
                </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold', color: 'black' }}>Available Hours</Text>
        </View>

        {availableOptions.map((option) => (
                    <View key={option.id} style={styles.optionContainer}>
                        <CheckBox
                            value={selectedOptions.includes(option.id)}
                            onValueChange={() => toggleOption(option.id)}
                        />
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </View>
                ))}
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
                style={[
                    styles.button,
                    resetSelected && styles.selectedButton, 
                ]}
                onPress={handleReset}
                >
                <Text
                    style={[
                        styles.buttonText1,
                        resetSelected && styles.selectedText,
                    ]}
                >
                    Reset
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[
                    styles.button,
                    applySelected && styles.selectedButton,
                ]}
                onPress={handleApply}
                >
                <Text
                    style={[
                        styles.buttonText1,
                        applySelected && styles.selectedText, 
                    ]}
                >
                    Apply
                </Text>
                </TouchableOpacity>

            </View>

    </View>
  );
};

export default Filterscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  genderButton: {
    width: 100,
    backgroundColor: 'white',
    borderColor: '#49b2e9',
    borderWidth: 1,
    padding: 12,
    paddingVertical: 11,
    margin: 5,
    top: 10,
    alignItems: 'center',
  },
  ratingButton: {
    width: 73,
    backgroundColor: 'white',
    borderColor: '#49b2e9',
    borderWidth: 1,
    padding: 12,
    paddingVertical: 11,
    margin: 5,
    top: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedButton: {
    backgroundColor: '#49b2e9',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  datePicker: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#49b2e9',
    borderWidth: 1,
    padding: 12,
    paddingVertical: 11,
    margin: 5,
    top: 10,
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
},
dateIcon: {
    marginRight: 10, 
},
optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
    top:10
},
optionLabel: {
    fontSize: 16,
    marginLeft: 10, 
},
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
},
button: {
    flex: 1,
    backgroundColor: '#49b2e9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
},
buttonText1: {
    color: 'white',
    fontSize: 16,
},
selectedButton: {
    backgroundColor: '#4aa0e5',
},
selectedText: {
    color: 'white', 
},
});
