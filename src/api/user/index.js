import auth from '@react-native-firebase/auth';

export const login = async (loginProps) => {
  try {
    const {username, password} = loginProps;
    await auth().signInWithEmailAndPassword(username, password);
  } catch (e) {
    throw e;
    // pop error dialog box if login error
  }
};
