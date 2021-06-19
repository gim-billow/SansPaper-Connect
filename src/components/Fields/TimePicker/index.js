/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const TimePicker = (props) => {
  const {item, updateFieldsValue, isEditable} = props;
  const [label, setLabel] = useState('Select time');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    let value = props.item.value.toString();
    if (value) {
      if (value.includes('Date')) {
        setLabel(moment().format('h:mm a'));
      } else {
        setLabel(moment(parseInt(value, 10)).format('h:mm a'));
      }

      setChangeTheme(true);
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
    if (label !== 'Select time') {
      Toast.show('Success, remove the time ' + label.toString());
      setLabel('Select time');
      setChangeTheme(false);
      updateFieldsValue({rank: item.rank, value: ''});
    }
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
        <View style={styles.date}>
          <Button
            disabled={!isEditable}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={label.toString()}
            type={changeTheme ? 'solid' : 'outline'}
            titleStyle={styles.title}
            buttonStyle={styles.container}
            onPress={showTimePicker}
            onLongPress={cancel}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            headerTextIOS="Set a time"
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
    </>
  );
};

export default TimePicker;
