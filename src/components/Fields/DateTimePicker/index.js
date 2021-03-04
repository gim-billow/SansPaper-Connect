import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {saveDefaultTime, getDefaultTime, getTime} from './helper';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const DateTimePicker = (props) => {
  const {item, updateFieldsValue} = props;
  let value = '0';

  const currentDateFormat =
    new Date().getDate() +
    '/' +
    new Date().getMonth() +
    1 +
    '/' +
    new Date().getFullYear();

  const [dateLabel, setDateLabel] = useState(currentDateFormat.toString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeDateTheme, setChangeDateTheme] = useState(false);

  const [timeLabel, setTimeLabel] = useState('Select Time');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTimeTheme, setChangeTimeTheme] = useState(false);
  const [defaultTime, setDefaultTime] = useState('none');

  useEffect(() => {
    async function DefaultTime() {
      const getDefaultTimes = await getDefaultTime();
      const getTimes = await getTime();

      updateFieldsValue({rank: item.rank, value: Number(getTimes)});

      setDefaultTime(getDefaultTimes);
      getDefaultTimes !== 'none' ? setTimeLabel(getDefaultTimes) : '';
      getDefaultTimes !== 'none' ? setChangeTimeTheme(true) : '';
    }

    DefaultTime();
  }, [item.rank, setDefaultTime, updateFieldsValue]);

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
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const dateFormat = day + '/' + month + '/' + year;

    setDateLabel(dateFormat);
    setChangeDateTheme(true);

    hideDatePicker();
  };

  const timeFormat = (time) => {
    let hrs = time !== 'currentTime' ? time.getHours() : new Date().getHours();
    let mins =
      time !== 'currentTime' ? time.getMinutes() : new Date().getMinutes();
    let ampm = hrs >= 12 ? 'pm' : 'am';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    mins = mins < 10 ? '0' + mins : mins;

    const getTimeValue =
      time !== 'currentTime' ? time.getTime() : new Date().getTime();

    updateFieldsValue({rank: item.rank, value: getTimeValue});

    return hrs + ':' + mins + ' ' + ampm;
  };

  const timeHandleConfirm = (time) => {
    setTimeLabel((t) => (t = timeFormat(time)));
    setChangeTimeTheme(true);
    hideTimePicker();
  };

  const updateDefaultTime = async () => {
    if (changeTimeTheme) {
      await saveDefaultTime(timeLabel, value.toString());
      setDefaultTime(timeLabel);
    } else {
      await saveDefaultTime(timeFormat('currentTime', value.toString()));
      setTimeLabel((t) => (t = timeFormat('currentTime')));
      setDefaultTime(timeFormat('currentTime'));
    }

    setChangeTimeTheme(true);
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{item.label}</Text>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
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
            onConfirm={dateHandleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.button}>
          <Button
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
            headerTextIOS="Set a time"
            onConfirm={timeHandleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.SetDefault}>
          <Button
            mode="contained"
            style={styles.buttonColor}
            onPress={updateDefaultTime}>
            <Text style={styles.textSet}>set default</Text>
          </Button>
        </View>
        <View>
          <Text style={styles.textSet}>
            - set current {props.item.label.toLowerCase()} time as default
          </Text>
          <Text style={styles.textSet}>- currently saved at {defaultTime}</Text>
        </View>
      </View>
    </ItemWrapper>
  );
};

export default DateTimePicker;
