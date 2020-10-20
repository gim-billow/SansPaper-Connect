import produce from 'immer';

import {COMMON_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  formInit: false,
  formFieldsInit: false,
  linkedItemInit: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMMON_REDUCER_ACTIONS.UPDATE_FORM_INIT: {
      return produce(state, (draftState) => {
        draftState.formInit = action.payload;
      });
    }
    case COMMON_REDUCER_ACTIONS.UPDATE_FORM_FIELDS_INIT: {
      return produce(state, (draftState) => {
        draftState.formFieldsInit = action.payload;
      });
    }
    case COMMON_REDUCER_ACTIONS.UPDATE_LINKED_ITEMS_INIT: {
      return produce(state, (draftState) => {
        draftState.linkedItemInit = action.payload;
      });
    }
    default:
      return state;
  }
};
