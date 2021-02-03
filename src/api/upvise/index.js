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
  if (table === 'unybiz.projects.projects' && !where) {
    where = 'status != 1';
  } else if (table === 'jobs.jobs' && !where) {
    where = 'status != 4';
  }

  const {upviseUrl = '', upviseToken = ''} = organisation;
  const urlString = `${upviseUrl}/table?auth=${upviseToken}&table=${table}`;
  const url = where ? `${urlString}&where=${where}` : urlString;
  const options = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const upviseTableResult =  await axios(options);
  console.log('queryUpviseTable', upviseTableResult);
  return upviseTableResult;
};
