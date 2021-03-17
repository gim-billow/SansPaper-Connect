import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const saveImageInStorage = async (imageId, base64Image) => {
  try {
    const app = firebase.app();
    const bucket = app.storage(
      'gs://billow-software-upvise-forms-submitted-images/',
    );

    var random = Math.random();

    await bucket
      .ref('/' + imageId + ':' + random + '.jpg')
      .putString(base64Image, 'base64', {contentType: 'image/jpeg'});

    const imageFile = await bucket
      .ref('/' + imageId + ':' + random + '.jpg')
      .getDownloadURL();

    return imageFile;
  } catch (e) {
    console.trace();
    console.log('Error in postSansPaperUpviseFormStorage', e);
  }
};
