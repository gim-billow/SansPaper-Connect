import React, {useState, memo, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {Button} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import {commonStyles} from '@styles/common';
import MandatoryField from '../MandatoryField';

const DatePicker = (props) => {
  const {item, updateFieldsValue} = props;
  const [label, setLabel] = useState('Select Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    const value = props.item.value;
    if (value && value.includes('Date')) {
      setLabel(moment().format('D/M/YYYY'));
      setChangeTheme(true);
      updateFieldsValue({rank: props.item.rank, value: Date.now()});
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
    <ItemWrapper>
      <View style={styles.topContainer}>
        <Text style={commonStyles.text}>{item.label}</Text>
        {item.mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.date}>
          <Button
            onLongPress={cancel}
            onPress={showDatePicker}
            mode="contained"
            style={[
              styles.button,
              changeTheme === true
                ? styles.alternativeBtnStyle
                : styles.defaultBtnStyle,
            ]}>
            <Text
              style={
                changeTheme === true ? styles.btnTxt : styles.alterBtnText
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
      </View>
      <Divider />
    </ItemWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.item.value === nextProps.item.value) {
    return true;
  }
  return false;
};

export default memo(DatePicker, areEqual);
