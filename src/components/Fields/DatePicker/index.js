import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
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
    const dateFormat =
      date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();

    setLabel(dateFormat);
    setChangeTheme(true);
    updateFieldsValue({rank: item.rank, value: dateFormat});

    hideDatePicker();
  };

  return (
    <ItemWrapper>
      <View style={styles.date}>
        <Button
          mode="contained"
          style={
            changeTheme === true ? styles.ChangeButtonColor : styles.buttonColor
          }
          onPress={showDatePicker}>
          <Text
            style={
              changeTheme === true ? styles.ChangeTextColor : styles.TextColor
            }>
            {label.toString()}
          </Text>
        </Button>
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
