import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
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
    const hrs = time.getHours();
    const mins = time.getMinutes();

    const ampm = hrs >= 12 ? 'pm' : 'am';
    const hrsFormat = hrs % 12;
    const hrsCorrection = hrsFormat ? hrsFormat : 12; // the hour '0' should be '12'
    const minsCorrection = mins < 10 ? '0' + mins : mins;
    const timeFormat = hrsCorrection + ':' + minsCorrection + ' ' + ampm;

    setLabel(timeFormat);
    setChangeTheme(true);

    updateFieldsValue({rank: item.rank, value: time.getTime()});

    hideTimePicker();
  };

  return (
    <ItemWrapper>
      <View style={styles.date}>
        <Button
          mode="contained"
          style={
            changeTheme === true ? styles.ChangeButtonColor : styles.buttonColor
          }
          onPress={showTimePicker}>
          <Text
            style={
              changeTheme === true ? styles.ChangeTextColor : styles.TextColor
            }>
            {label.toString()}
          </Text>
        </Button>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="Time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      </View>
    </ItemWrapper>
  );
};

export default TimePicker;
