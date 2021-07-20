/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Button} from 'react-native-elements';

import {setDateTimeFormatDisplay, setDateTime, swapDateNum} from './helper';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const DateTimePicker = (props) => {
  const {
    item,
    updateFieldsValue,
    isEditable,
    draftId,
    draftFormHasChanges,
  } = props;
  const [dateLabel, setDateLabel] = useState(
    setDateTimeFormatDisplay('date', Date.now()),
  );
  const [displayDate, setDisplayDate] = useState(swapDateNum(dateLabel));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeDateTheme, setChangeDateTheme] = useState(false);

  const [timeLabel, setTimeLabel] = useState(
    setDateTimeFormatDisplay('time', Date.now()),
  );
  const [displayTime, setDisplayTime] = useState(new Date().getTime());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTimeTheme, setChangeTimeTheme] = useState(false);

  useEffect(() => {
    let value = props.item.value || '';
    if (value) {
      value = props.item.value.toString();
      // if (value) {
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
      // }
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

    if (draftId) draftFormHasChanges(true);
    updateFieldsValue({rank: item.rank, value: dateTime});
  };

  const timeHandleConfirm = (time) => {
    hideTimePicker();
    const timeFormat = setDateTimeFormatDisplay('time', time);
    const dateTime = setDateTime(dateLabel, timeFormat);

    setTimeLabel(timeFormat);
    setDisplayTime(dateTime);
    setChangeTimeTheme(true);

    if (draftId) draftFormHasChanges(true);
    updateFieldsValue({rank: item.rank, value: dateTime});
  };

  const cancelDate = () => {
    const dateFormat = setDateTimeFormatDisplay('date', Date.now());

    setDateLabel(dateFormat);
    setDisplayDate(swapDateNum(dateFormat));

    setChangeDateTheme(false);
    updateFieldsValue({rank: item.rank, value: ''});

    Toast.show('Date cleared.');
  };

  const cancelTime = () => {
    const dateFormat = setDateTimeFormatDisplay('time', Date.now());
    // setTimeLabel('Select time');
    setTimeLabel(dateFormat);
    setDisplayTime(new Date().getTime());

    setChangeTimeTheme(false);
    updateFieldsValue({rank: item.rank, value: ''});

    Toast.show('Time cleared.');
  };

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{item.label}</Text>
        {item.mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.container}>
          <Button
            disabled={!isEditable}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={dateLabel.toString()}
            type={changeDateTheme ? 'solid' : 'outline'}
            titleStyle={styles.title}
            buttonStyle={styles.btnContainer}
            onPress={showDatePicker}
            onLongPress={cancelDate}
          />
          <Button
            disabled={!isEditable}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={timeLabel.toString()}
            type={changeTimeTheme ? 'solid' : 'outline'}
            titleStyle={styles.title}
            buttonStyle={styles.btnContainer}
            onPress={showTimePicker}
            onLongPress={cancelTime}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={new Date(displayDate)}
            onConfirm={dateHandleConfirm}
            onCancel={hideDatePicker}
          />
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
    </>
  );
};

export default DateTimePicker;
