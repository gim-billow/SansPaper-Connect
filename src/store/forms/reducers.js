import produce from 'immer';
import {FORM_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  currentFormId: '',
  currentForm: {
    fields: [],
  },
  scrollToMandatory: null,
  currentLinkedItems: [{}],
  forms: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_ID: {
      console.log('FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_ID', action);
      return produce(state, (draftState) => {
        draftState.currentFormId = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM: {
      return produce(state, (draftState) => {
        draftState.currentForm = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_CURRENT_LINKED_TABLE: {
      return produce(state, (draftState) => {
        draftState.currentLinkedItems = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_FORM_LIST: {
      return produce(state, (draftState) => {
        draftState.forms = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_FIELDS: {
      return produce(state, (draftState) => {
        draftState.currentForm.fields = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_SCROLL_TO_MANDATORY: {
      return produce(state, (draftState) => {
        draftState.scrollToMandatory = action.payload;
      });
    }
    default:
      return state;
  }
};
