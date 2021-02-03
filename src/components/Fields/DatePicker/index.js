import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const DatePicker = (props) => {
  const {item, updateFieldsValue} = props;
  const [label, setLabel] = useState('Select Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const dateFormat = day + '/' + month + '/' + year;

    setLabel(dateFormat);
    setChangeTheme(true);
    updateFieldsValue({rank: item.rank, value: dateFormat});

    hideDatePicker();
  };

  const cancel = () => {
    if (label !== 'Select Date') {
      Toast.show('Success, remove the date ' + label.toString());
      setLabel('Select Date');
      setChangeTheme(false);
      updateFieldsValue({rank: item.rank, value: ''});
    }
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{item.label}</Text>
      <View style={styles.date}>
        <TouchableRipple onLongPress={cancel} onPress={showDatePicker}>
          <Button
            mode="contained"
            style={
              changeTheme === true
                ? styles.ChangeButtonColor
                : styles.buttonColor
            }>
            <Text
              style={
                changeTheme === true ? styles.ChangeTextColor : styles.TextColor
              }>
              {label.toString()}
            </Text>
          </Button>
        </TouchableRipple>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </ItemWrapper>
  );
};

export default DatePicker;
