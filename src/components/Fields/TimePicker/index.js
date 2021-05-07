import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const TimePicker = (props) => {
  const {item, updateFieldsValue} = props;
  const [label, setLabel] = useState('Select Time');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    const value = props.item.value;
    if (value && value.includes('Date')) {
      setLabel(moment().format('h:mm a'));
      setChangeTheme(true);
      updateFieldsValue({rank: props.item.rank, value: Date.now()});
    }
  }, []);

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
      <View style={styles.topContainer}>
        <Text style={commonStyles.text}>{item.label}</Text>
        {item.mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
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
                  changeTheme === true
                    ? styles.ChangeTextColor
                    : styles.TextColor
                }>
                {label.toString()}
              </Text>
            </Button>
          </TouchableRipple>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            headerTextIOS="Set a time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default TimePicker;
