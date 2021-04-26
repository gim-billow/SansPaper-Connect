import moment from 'moment';

export const uniqueKey = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const convertDate = (date) => {
  return moment(date).format('MM/DD/YYYY HH:mm');
};

export const diff = function (a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
};
