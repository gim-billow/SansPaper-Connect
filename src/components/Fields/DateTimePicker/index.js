import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Divider} from 'react-native-elements';

import {
  saveDefaultTime,
  getDefaultTime,
  getTime,
  setDateTimeFormatDisplay,
  setDateTime,
  swapDateNum,
} from './helper';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const DateTimePicker = (props) => {
  const {item, updateFieldsValue} = props;
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
  const [defaultTime, setDefaultTime] = useState('none');

  useEffect(() => {
    const value = props.item.value;
    if (value && value.includes('Date')) {
      const dateFormat = setDateTimeFormatDisplay('date', Date.now());
      const timeFormat = setDateTimeFormatDisplay('time', Date.now());
      setDateLabel(dateFormat);
      setTimeLabel(timeFormat);
      const dateTime = setDateTime(dateFormat, timeFormat);

      updateFieldsValue({rank: props.item.rank, value: dateTime});
    }
  }, []);

  /*
  useEffect(() => {
    (async () => {
      const getDefaultTimes = await getDefaultTime();
      const getTimes = await getTime();

      setDisplayTime(Number(getTimes));

      updateFieldsValue({rank: item.rank, value: Number(getTimes)});

      setDefaultTime(getDefaultTimes);
      getDefaultTimes !== 'none' ? setTimeLabel(getDefaultTimes) : '';
      getDefaultTimes !== 'none' ? setChangeTimeTheme(true) : '';
    })();
  }, [item.rank, setDefaultTime, updateFieldsValue]);
*/
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

  // const updateDefaultTime = async () => {
  //   if (changeTimeTheme) {
  //     const dateTime = setDateTime(dateLabel, timeLabel);

  //     await saveDefaultTime(timeLabel, dateTime.toString());
  //     setDefaultTime(timeLabel);

  //     updateFieldsValue({rank: item.rank, value: dateTime});
  //   } else {
  //     const currentTime = setDateTimeFormatDisplay('time', Date.now());
  //     const currentDate = setDateTimeFormatDisplay('date', Date.now());
  //     const dateTime = setDateTime(currentDate, currentTime);

  //     await saveDefaultTime(currentTime, dateTime.toString());
  //     setTimeLabel(currentTime);
  //     setDefaultTime(currentTime);

  //     updateFieldsValue({rank: item.rank, value: dateTime});
  //   }

  //   setChangeTimeTheme(true);
  // };

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
        {/*
        <View style={styles.container}>
          <View style={styles.SetDefault}>
            <Button
              mode="contained"
              style={styles.buttonColor}
              onPress={updateDefaultTime}>
              <Text style={styles.textSet}>set default</Text>
            </Button>
          </View>
          <View style={styles.textSetWrapper}>
            <Text style={styles.textSet}>
              - set current {props.item.label.toLowerCase()} as default
            </Text>
            <Text style={styles.textSet}>
              - currently saved at {defaultTime}
            </Text>
          </View>
        </View>
        */}
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default DateTimePicker;
