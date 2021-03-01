import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const TimePicker = (props) => {
  const {item, updateFieldsValue} = props;
  const [label, setLabel] = useState('Select Time');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time) => {
    let hrs = time.getHours();
    let mins = time.getMinutes();

    let ampm = hrs >= 12 ? 'pm' : 'am';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    mins = mins < 10 ? '0' + mins : mins;

    const timeFormat = hrs + ':' + mins + ' ' + ampm;

    setLabel(timeFormat);
    setChangeTheme(true);

    updateFieldsValue({rank: item.rank, value: time.getTime()});

    hideTimePicker();
  };

  const cancel = () => {
    if (label !== 'Select Time') {
      Toast.show('Success, remove the time ' + label.toString());
      setLabel('Select Time');
      setChangeTheme(false);
      updateFieldsValue({rank: item.rank, value: ''});
    }
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{item.label}</Text>
      <View style={styles.date}>
        <TouchableRipple onLongPress={cancel} onPress={showTimePicker}>
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
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    </ItemWrapper>
  );
};

export default TimePicker;
