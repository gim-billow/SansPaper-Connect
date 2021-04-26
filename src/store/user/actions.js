export const USER_ACTIONS = {
  LOGIN: 'userActions/LOGIN',
  LOGOUT: 'userActions/LOGOUT',
  LOGIN_CODE: 'userActions/LOGIN_CODE',
  GOOGLE_LOGIN: 'userActions/GOOGLE_LOGIN',
  APPLE_LOGIN: 'userActions/APPLE_LOGIN',
};

export const USER_SAGA_ACTIONS = {
  UPDATE_USER_DETAILS: 'userActions/UPDATE_USER_DETAILS',
};

export const USER_REDUCER_ACTIONS = {
  UPDATE_LOGIN_STATUS: 'userActions/UPDATE_LOGIN_STATUS',
  UPDATE_USER_EMAIL: 'userAction/UPDATE_USER_EMAIL',
  UPDATE_USER_ID: 'userAction/UPDATE_USER_ID',
};

export const loginUser = (payload) => ({
  type: USER_ACTIONS.LOGIN,
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
  payload: {status: false, email: '', uid: ''},
});

export const resetLoginCode = () => ({
  type: USER_ACTIONS.LOGIN_CODE,
  payload: null,
});
