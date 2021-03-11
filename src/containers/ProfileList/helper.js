//import database from 'database';
import {UpviseTablesMap} from 'constant/UpviseTablesMap';

export const fieldsProps = {
  project: {
    title: UpviseTablesMap['projects.projects'],
  },
  numeric: {
    keyboardType: 'numeric',
  },
  user: {},
  selectmulti: {
    single: false,
  },
};

export const itemMap = (name, email) => {
  return [
    {type: 'user', userName: name, label: 'Username', image: 'ok'},
    {type: 'level', points: '278', label: 'Level'},
    {type: 'email', email: email, label: 'Email'},
    {type: 'password', label: 'Password'},
    {type: 'setting', label: 'Setting'},
    {type: 'update', label: 'update'},
    {type: 'logout', label: 'Logout'},
    {type: 'version', label: 'Current version', version: '3.61.281'},
  ];
};
