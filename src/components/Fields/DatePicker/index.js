import React, {useState, memo, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {Button} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import {commonStyles} from '@styles/common';
import MandatoryField from '../MandatoryField';

const DatePicker = (props) => {
  const {
    item,
    updateFieldsValue,
    isEditable,
    draftFormHasChanges,
    draftId,
  } = props;
  const [label, setLabel] = useState('Select date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    let value = props.item.value.toString();
    if (value) {
      if (value.includes('Date')) {
        setLabel(moment().format('D/M/YYYY'));
        updateFieldsValue({rank: item.rank, value: new Date().getTime()});
      } else {
        setLabel(moment(parseInt(value, 10)).format('D/M/YYYY'));
      }
      setChangeTheme(true);
    }
  }, []);

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
    updateFieldsValue({rank: item.rank, value: date.getTime()});
    if (draftId) draftFormHasChanges(true);

    hideDatePicker();
  };

  const cancel = () => {
    if (label !== 'Select Date') {
      Toast.show('date cleared');
      setLabel('Select Date');
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
            onPress={showDatePicker}
            onLongPress={cancel}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.item.value === nextProps.item.value) {
    return true;
  }
  return false;
};

export default memo(DatePicker, areEqual);
