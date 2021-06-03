import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
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

export const saveUserEmail = async (props) => {
  try {
    const {username, saveUser} = props;
    const jsonValue = JSON.stringify({username, saveUser});
    await AsyncStorage.setItem('@savedUserEmail', jsonValue);
  } catch (e) {
    throw e;
  }
};

export const readUserEmail = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@savedUserEmail');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
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

export const googleLogin = async () => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (e) {
    throw e;
  }
};

export const appleLogin = async () => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    await auth().signInWithCredential(appleCredential);
  } catch (e) {
    throw e;
  }
};

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
