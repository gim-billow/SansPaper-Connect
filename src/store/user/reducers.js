import produce from 'immer';
import {USER_ACTIONS, USER_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  loginStatus: false,
  email: '',
  uid: '',
  loginCode: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS: {
      return produce(state, (draftState) => {
        draftState.loginStatus = action.payload;
      });
    }
    case USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL: {
      return produce(state, (draftState) => {
        draftState.email = action.payload;
      });
    }
    case USER_REDUCER_ACTIONS.UPDATE_USER_ID: {
      return produce(state, (draftState) => {
        draftState.uid = action.payload;
      });
    }
    case USER_ACTIONS.LOGIN_CODE: {
      return produce(state, (draftState) => {
        draftState.loginCode = action.payload;
      });
    }
    default:
      return state;
  }
};
