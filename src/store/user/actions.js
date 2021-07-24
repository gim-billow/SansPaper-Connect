export const USER_ACTIONS = {
  LOGIN: 'userActions/LOGIN',
  LOGOUT: 'userActions/LOGOUT',
  LOGIN_CODE: 'userActions/LOGIN_CODE',
  GOOGLE_LOGIN: 'userActions/GOOGLE_LOGIN',
  APPLE_LOGIN: 'userActions/APPLE_LOGIN',
  ERROR_SSO_USER: 'userActions/ERROR_SSO_USER',
  SAVE_USER: 'userActions/SAVE_USER',
  FORGO_PASSWORD: 'userActions/FORGOT_PASSWORD',
  SIGN_UP_EMAIL: 'userActions/SIGN_UP_EMAIL',
  SAVE_PROFILE_PIC: 'userActions/SAVE_PROFILE_PIC',
  REMOVE_ALL_DOWNLOAD_FORMS: 'userActions/REMOVE_ALL_DOWNLOAD_FORMS',
};

export const USER_SAGA_ACTIONS = {
  UPDATE_USER_DETAILS: 'userActions/UPDATE_USER_DETAILS',
  ON_USER_CHANGED: 'userActions/ON_USER_CHANGED',
  ON_CHANGE_PASS_BOOL: 'userActions/ON_CHANGE_PASS_BOOL',
  ON_LOAD_USER_PROFILE: 'userActions/ON_LOAD_USER_PROFILE',
  ON_BETA_ACCESS_EXPIRY_DATE: 'userActions/ON_BETA_ACCESS_EXPIRY_DATE',
  WATCH_SUBSCRIPTION_FEATURE_EXPIRY:
    'userActions/WATCH_SUBSCRIPTION_FEATURE_EXPIRY',
};

export const USER_REDUCER_ACTIONS = {
  UPDATE_LOGIN_STATUS: 'userActions/UPDATE_LOGIN_STATUS',
  UPDATE_USER_EMAIL: 'userAction/UPDATE_USER_EMAIL',
  UPDATE_USER_ID: 'userAction/UPDATE_USER_ID',
  LOAD_PROFILE_PICTURE: 'userAction/LOAD_PROFILE_PICTURE',
  UPDATE_PROFILE_PIC: 'userActions/UPDATE_PROFILE_PIC',
  SET_BETA_ACCESS_EXPIRY: 'userActions/SET_BETA_ACCESS_EXPIRY',
  SET_USER_ACCESS_OFFLINE: 'userActions/SET_USER_ACCESS_OFFLINE',
  SET_USER_BOK_FEATURE: 'userActions/SET_USER_BOK_FEATURE',
};

export const loginUser = (payload) => ({
  type: USER_ACTIONS.LOGIN,
  payload,
});

export const forgotPasswordUser = (payload) => ({
  type: USER_ACTIONS.FORGO_PASSWORD,
  payload,
});

export const loginWithGoogle = () => ({
  type: USER_ACTIONS.GOOGLE_LOGIN,
});

export const loginWithApple = () => ({
  type: USER_ACTIONS.APPLE_LOGIN,
});

export const logoutUser = () => ({
  type: USER_ACTIONS.LOGOUT,
  payload: {status: false, email: '', uid: '', loginCode: null},
});

export const resetLoginCode = () => ({
  type: USER_ACTIONS.LOGIN_CODE,
  payload: null,
});

export const errorLogin = () => ({
  type: USER_ACTIONS.ERROR_SSO_USER,
});

export const saveUser = (payload) => ({
  type: USER_ACTIONS.SAVE_USER,
  payload,
});

export const signUpEmail = (payload) => ({
  type: USER_ACTIONS.SIGN_UP_EMAIL,
  payload,
});

export const saveProfilePicture = (payload) => ({
  type: USER_ACTIONS.SAVE_PROFILE_PIC,
  payload,
});

export const removeAllDownloadForms = () => ({
  type: USER_ACTIONS.REMOVE_ALL_DOWNLOAD_FORMS,
});
