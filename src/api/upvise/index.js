//Library
import axios from 'axios';
import {firebase} from '@react-native-firebase/firestore';
import {sortBy, prop} from 'ramda';
import AsyncStorage from '@react-native-community/async-storage';

const uuid = require('uuid/v4');

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

export const setStorageUserId = async (value) => {
  try {
    await AsyncStorage.setItem('@userid', value);
  } catch (e) {
    // saving error
  }
};

export const getStorageUserId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userid');

    return jsonValue;
  } catch (e) {
    // error reading value
  }
};

export const getUser = () => {
  try {
    const user = firebase.auth().currentUser
      ? firebase.auth().currentUser
      : getStorageUserId();

    let tempUserid = user.uid.toString();

    tempUserid !== getStorageUserId() && setStorageUserId(tempUserid);

    return tempUserid;
  } catch (error) {
    console.warn('Error getting user id', error);
    return null;
  }
};

const fetchSansPaperUser = async () => {
  try {
    const userid = getUser();
    const userRef = await firebase
      .firestore()
      .collection('sanspaperusers')
      .doc(userid)
      .get();
    return userRef;
  } catch (error) {
    console.warn('Error getting Sans Paper User', error);
  }
};

const fetchSansPaperUserOrganisation = async (user) => {
  try {
    const organisationPath = await fetchSansPaperUserOrganisationPath(user);
    const organisation = await firebase.firestore().doc(organisationPath).get();
    // console.log("Checking org in fspuserorg", organisation);
    return organisation.data();
  } catch (error) {
    console.warn('Error getting Sans Paper User Organisation', error);
  }
};

const fetchSansPaperUserOrganisationPath = async (user) => {
  try {
    const organisation = await user.data().organisations;
    // console.log("checking organisation in FSPUserOrgPath", organisation);
    return organisation.path; // This is what needs to be adjusted for multi orgs.
  } catch (error) {
    console.warn('Error getting Sans Paper User Organisation', error);
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
  const urlString = `${upviseUrl}table?auth=${upviseToken}&table=${table}`;
  const url = where ? `${urlString}&where=${where}` : urlString;
  console.log('post-url', url);
  const options = {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const upviseTableResult = await axios(options);
  console.log('queryUpviseTable', upviseTableResult);
  return upviseTableResult;
};

// for submit the form data
export const submitUpviseForm = async (form, title) => {
  //saving form async storage
  // console.log('====>>>>'+ form);
  // setAsyncUpviseForm(form, title);

  //sumit form to firebase
  const user = await fetchSansPaperUser();
  console.log('submit==>ID', user);
  const organisationPath = await fetchSansPaperUserOrganisationPath(user);
  console.log('submit==org', organisationPath);
  const submitted = await postSansPaperUpviseForm(
    JSON.parse(JSON.stringify(form)),
    organisationPath,
  );
  console.log('submit==sub', submitted);
  return submitted;
};

const postSansPaperUpviseForm = async (form, orgPath) => {
  try {
    const id = uuid().replace(/-/g, '');
    console.log('submit==>uuid', id);
    const formattedForm = {
      id: id,
      owner: firebase.auth().currentUser.email,
      date: Date.now(),
      linkedid: form.linkedid,
      linkedtable: form.linkedtable,
      name: form.name + '9999',
      templateid: form.id,
      geo: form.geo ? form.geo : '',
      value: await utilUpviseFormValueBuilder(id, form.fields),
    };
    // console.log("formattedFrom is ", formattedForm);
    const batch = firebase.firestore().batch();
    const submitFormRef = firebase
      .firestore()
      .doc(orgPath)
      .collection('submittedUpviseForms')
      .doc(id);

    batch.set(submitFormRef, formattedForm);
    const response = await batch.commit();
    return 'true';
  } catch (error) {
    console.warn('Error submitting Sans Paper form', error);
    return error.message;
  }
};

const utilUpviseFormValueBuilder = async (formid, fields) => {
  const response = {};
  for (let item of fields) {
    if (item.value && item.value !== '') {
      if (item.type !== 'photo') {
        response[item.name] = item.value;
      } else {
        // console.log("checking what is passed in in item", item);
        if (!Array.isArray(item.value)) {
          continue;
        }
        for (let i = 0; i < item.value.length; i++) {
          const fileName = item.value[i].path.split('/');
          await utilUpviseUploadFileParamBuilder(
            formid + ':' + item.name,
            item.value[i].data,
            fileName[fileName.length - 1],
          );
        }
      }
    }
  }
  return JSON.stringify(response);
};
// todo continue to trace the function
const utilUpviseUploadFileParamBuilder = async (id, content, fileName) => {
  const user = await getSansPaperUser();
  const upviseAccount = await fetchSansPaperUserOrganisation(user);
  const orgRef = await fetchSansPaperUserOrganisationPath(user);
  const formattedImage = {};
  formattedImage.url = upviseAccount.upviseUrl;
  formattedImage.token = upviseAccount.upviseToken;
  formattedImage.content = content;
  formattedImage.fileName = fileName;
  formattedImage.id = id;
  formattedImage.mime = 'image/jpeg';
  // console.log(
  //   "checking formattedimage in utilupviseuploadfileparambuilder",
  //   formattedImage,
  // );

  const uploadImage = await postSansPaperUpviseFormStorage(id, content);
  formattedImage.content = uploadImage;
  const response = await postSansPaperUpviseFormImage(formattedImage, orgRef);
  // console.log("checking response", response);
  return response;
};

const postSansPaperUpviseFormStorage = async (imageId, base64Image) => {
  try {
    const app = firebase.app();
    const bucket = app.storage(
      'gs://billow-software-upvise-forms-submitted-images/',
    );

    // console.log("checking_1 ", imageId, base64Image)
    var random = Math.random();

    const task = await bucket
      .ref('/' + imageId + ':' + random + '.jpg')
      .putString(base64Image, 'base64', {contentType: 'image/jpeg'});

    // console.log("checking_2");

    const imageFile = await bucket
      .ref('/' + imageId + ':' + random + '.jpg')
      .getDownloadURL();
    // console.log("checking_3", imageFile);
    return imageFile;
  } catch (e) {
    console.trace();
    console.log('Error in postSansPaperUpviseFormStorage', e);
  }
};

const postSansPaperUpviseFormImage = async (imageFormatted, orgPath) => {
  try {
    const id = uuid().replace(/-/g, '');
    const batch = firebase.firestore().batch();
    const submitImageRef = firebase
      .firestore()
      .doc(orgPath)
      .collection('submittedUpviseImages')
      .doc(id);
    await batch.set(submitImageRef, imageFormatted);
    // console.log(batch);
    const response = await batch.commit();
    // console.log("checking batch response", response);
    return true;
  } catch (error) {
    console.warn('Error submitting Sans Paper form', error);
    return false;
  }
};
