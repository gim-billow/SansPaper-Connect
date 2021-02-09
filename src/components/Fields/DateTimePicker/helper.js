import AsyncStorage from '@react-native-community/async-storage';

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
