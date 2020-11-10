//Library
import axios from 'axios';
import {firebase} from '@react-native-firebase/firestore';
import {sortBy, prop} from 'ramda';

//util
import {getUpviseTabledQueryData} from '../util';

//sanspaper api requirements
export const getSansPaperUser = async (payload) => {
  try {
    const {userId} = payload;
    const spUser = await firebase
      .firestore()
      .collection('sanspaperusers')
      .doc(userId)
      .get();
    return spUser;
  } catch (error) {
    console.warn('Error getting Sans Paper User', error);
  }
};

export const getSansPaperUserOrganisation = async (payload) => {
  try {
    const {organisationPath} = payload;
    const organisation = await firebase.firestore().doc(organisationPath).get();
    return organisation.data();
  } catch (error) {
    console.warn('Error getting Sans Paper User Organisation', error);
  }
};

export const getUpviseUserList = async (upviseUrl, upviseToken) => {
  const data = `<batch auth="${upviseToken}"><query type="userlist" params="" /></batch>`;
  console.log('upvise url', upviseUrl);
  try {
    const response = await axios({
      url: upviseUrl + 'settings2?alt=json',
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    console.log('getUpviseUserList ===>', response);

    const {items = []} = response.data;
    return sortBy(prop('name'))(items);
  } catch (error) {
    console.log('getUpviseUserList ===>', error);
    return [];
  }
};

export const queryUpviseTable = async (payload) => {
  let {table, organisation, where} = payload;
  if (table == 'unybiz.projects.projects' && !where) {
    where = 'status != 1';
  }

  const {upviseUrl = '', upviseToken = ''} = organisation;

  const options = {
    method: 'POST',
    url: upviseUrl + 'table',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: getUpviseTabledQueryData({auth: upviseToken, table, where}),
  };

  return await axios(options);
};
