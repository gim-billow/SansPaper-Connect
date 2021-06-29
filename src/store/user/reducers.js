import produce from 'immer';
import {USER_ACTIONS, USER_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  loginStatus: false,
  email: '',
  profilePic: null,
  uid: '',
  loginCode: null,
  saveUser: false,
  offlineFeatureExpired: false,
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
    case USER_ACTIONS.ERROR_SSO_USER: {
      return produce(state, (draftState) => {
        draftState.loginStatus = false;
        draftState.email = '';
        draftState.uid = '';
      });
    }
    case USER_ACTIONS.SAVE_USER: {
      return produce(state, (draftState) => {
        draftState.saveUser = action.payload;
      });
    }
    case USER_REDUCER_ACTIONS.UPDATE_PROFILE_PIC: {
      return produce(state, (draftState) => {
        draftState.profilePic = action.payload;
      });
    }
    case USER_REDUCER_ACTIONS.SET_OFFLINE_ACCESS: {
      return produce(state, (draftState) => {
        draftState.offlineFeatureExpired = action.payload;
      });
    }
    default:
      return state;
  }
};
