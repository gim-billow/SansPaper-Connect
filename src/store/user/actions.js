export const USER_ACTIONS = {
  LOGIN: 'userActions/LOGIN',
};

export const USER_SAGA_ACTIONS = {
  UPDATE_USER_DETAILS: 'sagaActions/UPDATE_USER_DETAILS',
};

export const USER_REDUCER_ACTIONS = {
  UPDATE_LOGIN_STATUS: 'userActions/UPDATE_LOGIN_STATUS',
  UPDATE_USER_EMAIL: 'userActions/UPDATE_USER_EMAIL',
  UPDATE_USER_ID: 'userActions/UPDATE_USER_ID',
  UPDATE_USER_REFERENCE: 'userAction/UPDATE_USER_REFERENCE',
};

export const loginUser = (payload) => ({
  type: USER_ACTIONS.LOGIN,
  payload,
});
