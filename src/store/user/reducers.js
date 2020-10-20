import produce from 'immer';
import {USER_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  loginStatus: false,
  email: '',
  uid: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS: {
      return produce(state, (draftState) => {
        draftState.loginStatus = true;
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
    default:
      return state;
  }
};
