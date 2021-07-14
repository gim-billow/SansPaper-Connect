import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (loginProps) => {
  try {
    const {username, password} = loginProps;
    await auth().signInWithEmailAndPassword(username, password);
  } catch (e) {
    throw e;
    // pop error dialog box if login error
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
  } catch (e) {
    throw e;
  }
};

export const saveUserEmail = async (props) => {
  try {
    const {username, saveUser} = props;
    const jsonValue = JSON.stringify({username, saveUser});
    await AsyncStorage.setItem('@savedUserEmail', jsonValue);
  } catch (e) {
    throw e;
  }
};

export const saveBetaAccessExpiryDate = async (date) => {
  try {
    const dateString = new Date(date).toDateString();
    await AsyncStorage.setItem('@betaAccessExpiryDate', dateString);
  } catch (e) {
    throw e;
  }
};

export const readBetaAccessExpiryDate = () => {
  try {
    return AsyncStorage.getItem('@betaAccessExpiryDate');
  } catch (e) {
    throw e;
  }
};

export const saveOfflineFeatureExpiryDate = async (date) => {
  try {
    const dateString = new Date(date).toDateString();
    await AsyncStorage.setItem('@offlineFeatureExpiryDate', dateString);
  } catch (e) {
    throw e;
  }
};

export const saveBokFeatureExpiryDate = async (date) => {
  try {
    const dateString = new Date(date).toDateString();
    await AsyncStorage.setItem('@bokFeatureExpiryDate', dateString);
  } catch (e) {
    throw e;
  }
};

export const readBokFeatureExpiryDate = () => {
  try {
    return AsyncStorage.getItem('@bokFeatureExpiryDate');
  } catch (e) {
    throw e;
  }
};

export const readOfflineFeatureExpiryDate = () => {
  try {
    return AsyncStorage.getItem('@offlineFeatureExpiryDate');
  } catch (e) {
    throw e;
  }
};

export const removeOfflineFeatureExpiryDate = () => {
  try {
    return AsyncStorage.removeItem('@offlineFeatureExpiryDate');
  } catch (e) {
    throw e;
  }
};

export const removeBokFeatureExpiryDate = () => {
  try {
    return AsyncStorage.removeItem('@bokFeatureExpiryDate');
  } catch (e) {
    throw e;
  }
};

export const readUserEmail = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@savedUserEmail');
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return {username: null, saveUser: false};
  } catch (e) {
    throw e;
  }
};

export const removeUserEmail = async () => {
  try {
    await AsyncStorage.removeItem('@savedUserEmail');
  } catch (e) {
    throw e;
  }
};

// export const googleLogin = async () => {
//   try {
//     // Get the users ID token
//     const {idToken} = await GoogleSignin.signIn();

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     // Sign-in the user with the credential
//     await auth().signInWithCredential(googleCredential);
//   } catch (e) {
//     throw e;
//   }
// };

// export const appleLogin = async () => {
//   try {
//     // Start the sign-in request
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     // Ensure Apple returned a user identityToken
//     if (!appleAuthRequestResponse.identityToken) {
//       throw 'Apple Sign-In failed - no identify token returned';
//     }

//     // Create a Firebase credential from the response
//     const {identityToken, nonce} = appleAuthRequestResponse;
//     const appleCredential = auth.AppleAuthProvider.credential(
//       identityToken,
//       nonce,
//     );

//     // Sign the user in with the credential
//     await auth().signInWithCredential(appleCredential);
//   } catch (e) {
//     throw e;
//   }
// };

export const forgotPassword = async (email) => {
  try {
    const newOptions = {
      method: 'POST',
      url: 'https://app.platformhub.com.au/api/auth/forgot-password',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
      },
    };

    await axios(newOptions);
  } catch (e) {
    throw e;
  }
};

export const signUpEmailUserInterest = async (email) => {
  try {
    const newOptions = {
      method: 'POST',
      url:
        'https://us-central1-billow-software.cloudfunctions.net/EmailsFunctions-sendInterestEmail',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
      },
    };

    const response = await axios(newOptions);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const hasAppReview = async () => {
  try {
    const review = await AsyncStorage.getItem('appReview');
    if (review) {
      const json = JSON.parse(review);
      return json.hasReviewed;
    }
  } catch (error) {
    throw error;
  }
};

export const setAppReview = async (value) => {
  try {
    return await AsyncStorage.setItem(
      'appReview',
      JSON.stringify({hasReviewed: value}),
    );
  } catch (error) {
    throw error;
  }
};

export const loadProfilePicture = async (filename) => {
  const app = firebase.app();
  const bucket = app.storage(
    'gs://billow-software.appspot.com/SansPaperUserProfileImage/',
  );

  return await bucket.ref('/' + filename).getDownloadURL();
};

export const profilePicUploadStorage = async (filename, base64Img) => {
  try {
    const app = firebase.app();
    const bucket = app.storage(
      'gs://billow-software.appspot.com/SansPaperUserProfileImage/',
    );

    await bucket
      .ref('/' + filename)
      .putString(base64Img, 'base64', {contentType: 'image/jpeg'});

    await saveProfileImageInStorage(base64Img);

    const imageURL = await bucket.ref('/' + filename).getDownloadURL();

    return imageURL;
  } catch (e) {
    console.log('Error in profilePicUploadStorage', e);
  }
};

export const saveProfileImageInStorage = async (image) => {
  try {
    const base64 = 'data:image/jpg;base64,' + image;
    await AsyncStorage.setItem('@profileImgBase64', base64);
  } catch (e) {
    throw e;
  }
};

export const readProfileImageInStorage = () => {
  try {
    return AsyncStorage.getItem('@profileImgBase64');
  } catch (e) {
    throw e;
  }
};

export const removeProfileImageInStorage = () => {
  try {
    return AsyncStorage.removeItem('@profileImgBase64');
  } catch (e) {
    throw e;
  }
};

export const addProfImageToFirestore = async (uid, filename) => {
  try {
    await firebase.firestore().collection('sanspaperusers').doc(uid).update({
      profileImg: filename,
    });
  } catch (error) {
    console.warn('Error addProfImageToFirestore', error);
  }
};

export const checkOfflineFeature = async () => {
  try {
    const docSnapshot = await firebase
      .firestore()
      .collection('sanspaperbeta')
      .doc('offline')
      .get();

    return docSnapshot;
  } catch (error) {
    console.warn('Error checkOfflineFeature', error);
  }
};

export const getSanspaperIdOfflineExpiry = async (userEmail) => {
  try {
    const docSnapshot = await firebase
      .firestore()
      .collection('sanspaperid')
      .doc(userEmail)
      .get();

    return docSnapshot;
  } catch (error) {
    console.warn('Error getSanspaperIdOfflineExpiry', error);
  }
};

export const getBokFeatureExpiry = async (userEmail) => {
  try {
    const docSnapshot = await firebase
      .firestore()
      .collection('sanspaperbok')
      .doc(userEmail)
      .get();

    return docSnapshot;
  } catch (error) {
    console.warn('Error getBokFeatureExpiry', error);
  }
};
