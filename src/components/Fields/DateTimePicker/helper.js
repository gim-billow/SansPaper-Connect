import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const swapDateNum = (date) => {
  const dateArr = date.split('/');
  const month = dateArr[1];
  dateArr[1] = dateArr[0];
  dateArr[0] = month;

  return dateArr.join('/');
};

export const saveDefaultTime = async (defaultTime, getTime) => {
  try {
    await AsyncStorage.setItem('@defaultTime', defaultTime);
    await AsyncStorage.setItem('@getTime', getTime);
  } catch (e) {
    // console.log(e);
  }
};

export const getDefaultTime = async () => {
  try {
    const defaultTime = await AsyncStorage.getItem('@defaultTime');
    return defaultTime !== null ? defaultTime : 'none';
  } catch (e) {
    // console.log(e);
    return 'none';
  }
};

export const getTime = async () => {
  try {
    const Time = await AsyncStorage.getItem('@getTime');
    return Time !== null ? Time : 0;
  } catch (e) {
    // console.log(e);
    return 'none';
  }
};

export const setDateTime = (date, time) => {
  const formattedDate = swapDateNum(date);
  const dateTime = `${formattedDate} ${time}`;

  return new Date(dateTime).getTime();
};

export const setDateTimeFormatDisplay = (datetime, value) => {
  if (datetime === 'date') {
    return moment(value).format('D/M/YYYY');
  }

  return moment(value).format('h:mm a');
};
