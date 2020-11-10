import {firebase} from '@react-native-firebase/firestore';
import {map} from 'ramda';

export const getFormFields = async (payload) => {
  try {
    const {fieldsPath} = payload;
    const fields = await firebase
      .firestore()
      .collection(fieldsPath)
      .orderBy('rank')
      .get();

    return map((i) => i.data(), fields.docs);
  } catch (e) {
    throw e;
    // pop error dialog box if login error
  }
};

export const getUpviseTemplate = async (payload) => {
  try {
    const {organisationPath} = payload;
    const forms = await firebase.firestore().collection(organisationPath).get();

    return map((i) => i.data(), forms.docs);
  } catch (e) {
    throw e;
    // pop error dialog box if login error
  }
};
