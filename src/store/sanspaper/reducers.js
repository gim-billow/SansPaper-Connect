import produce from 'immer';
import {SANSPAPER_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  user: {},
  usersList: [],
  organisation: {},
  organisationPath: '',
  upviseTemplatePath: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_USER: {
      return produce(state, (draftState) => {
        draftState.user = action.payload;
      });
    }
    case SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_USER_LIST: {
      return produce(state, (draftState) => {
        draftState.userList = action.payload;
      });
    }
    case SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_ORGANISATION: {
      return produce(state, (draftState) => {
        draftState.organisation = action.payload;
      });
    }
    case SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_ORGANISATION_PATH: {
      return produce(state, (draftState) => {
        draftState.organisationPath = action.payload;
      });
    }
    case SANSPAPER_REDUCER_ACTIONS.UPDATE_UPVISE_TEMPLATE_PATH: {
      return produce(state, (draftState) => {
        draftState.upviseTemplatePath = action.payload;
      });
    }
    default:
      return state;
  }
};
