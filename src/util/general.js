import moment from 'moment';

export const uniqueKey = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const convertDate = (date) => {
  return moment(date).format('MM/DD/YYYY HH:mm');
};
