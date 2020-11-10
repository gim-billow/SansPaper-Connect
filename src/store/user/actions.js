export const USER_ACTIONS = {
  LOGIN: 'userActions/LOGIN',
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
