import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements';

import {setDateTimeFormatDisplay, setDateTime, swapDateNum} from './helper';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const DateTimePicker = (props) => {
  const {item, updateFieldsValue, isEditable} = props;
  const [dateLabel, setDateLabel] = useState(
    setDateTimeFormatDisplay('date', Date.now()),
  );
  const [displayDate, setDisplayDate] = useState(swapDateNum(dateLabel));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeDateTheme, setChangeDateTheme] = useState(false);

  const [timeLabel, setTimeLabel] = useState('Select Time');
  const [displayTime, setDisplayTime] = useState(new Date().getTime());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTimeTheme, setChangeTimeTheme] = useState(false);

  useEffect(() => {
    const value = props.item.value.toString();
    if (value) {
      let dateFormat, timeFormat;
      if (value.includes('Date')) {
        dateFormat = setDateTimeFormatDisplay('date', Date.now());
        timeFormat = setDateTimeFormatDisplay('time', Date.now());
        setDateLabel(dateFormat);
        setTimeLabel(timeFormat);
      } else {
        dateFormat = setDateTimeFormatDisplay('date', parseInt(value, 10));
        timeFormat = setDateTimeFormatDisplay('time', parseInt(value, 10));
        setDateLabel(dateFormat);
        setTimeLabel(timeFormat);
      }

      setChangeDateTheme(true);
      setChangeTimeTheme(true);
    }
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const dateHandleConfirm = (date) => {
    hideDatePicker();
    const dateFormat = setDateTimeFormatDisplay('date', date);
    const dateTime = setDateTime(dateFormat, timeLabel);

    setDateLabel(dateFormat);
    setDisplayDate(swapDateNum(dateFormat));
    setChangeDateTheme(true);

    updateFieldsValue({rank: item.rank, value: dateTime});
  };

  const timeHandleConfirm = (time) => {
    hideTimePicker();
    const timeFormat = setDateTimeFormatDisplay('time', time);
    const dateTime = setDateTime(dateLabel, timeFormat);

    setTimeLabel(timeFormat);
    setDisplayTime(dateTime);
    setChangeTimeTheme(true);

    updateFieldsValue({rank: item.rank, value: dateTime});
  };

  const cancelDate = () => {
    const dateFormat = setDateTimeFormatDisplay('date', Date.now());

    setDateLabel(dateFormat);
    setDisplayDate(swapDateNum(dateFormat));

    setChangeDateTheme(false);
    updateFieldsValue({rank: item.rank, value: 0});

    Toast.show('Date cleared.');
  };

  const cancelTime = () => {
    setTimeLabel('Select Time');
    setDisplayTime(new Date().getTime());

    setChangeTimeTheme(false);
    updateFieldsValue({rank: item.rank, value: 0});

    Toast.show('Time cleared.');
  };

  return (
    <ItemWrapper>
      <View style={styles.topContainer}>
        <Text style={commonStyles.text}>{item.label}</Text>
        {item.mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.container}>
          <View style={[styles.button, styles.left]}>
            <Button
              disabled={!isEditable}
              onLongPress={cancelDate}
              mode="contained"
              style={
                changeDateTheme === true
                  ? styles.ChangeButtonColor
                  : styles.buttonColor
              }
              onPress={showDatePicker}>
              <Text
                style={
                  changeDateTheme === true
                    ? styles.ChangeTextColor
                    : styles.TextColor
                }>
                {dateLabel.toString()}
              </Text>
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={new Date(displayDate)}
              onConfirm={dateHandleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={[styles.button, styles.right]}>
            <Button
              disabled={!isEditable}
              onLongPress={cancelTime}
              mode="contained"
              style={
                changeTimeTheme === true
                  ? styles.ChangeButtonColor
                  : styles.buttonColor
              }
              onPress={showTimePicker}>
              <Text
                style={
                  changeTimeTheme === true
                    ? styles.ChangeTextColor
                    : styles.TextColor
                }>
                {timeLabel.toString()}
              </Text>
            </Button>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              date={new Date(displayTime)}
              headerTextIOS="Set a time"
              onConfirm={timeHandleConfirm}
              onCancel={hideTimePicker}
            />
          </View>
        </View>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default DateTimePicker;
