import produce from 'immer';
import {FORM_REDUCER_ACTIONS, FORM_ACTION} from './actions';

const INIT_STATE = {
  currentFormId: '',
  currentForm: {
    fields: [],
  },
  scrollToMandatory: null,
  submitTriggered: 0,
  submittingForm: false,
  currentLinkedItems: [{}],
  forms: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_ID: {
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
    case FORM_REDUCER_ACTIONS.UPDATE_SUBMIT_TRIGGERED: {
      return produce(state, (draftState) => {
        draftState.submitTriggered = state.submitTriggered + 1;
      });
    }
    case FORM_REDUCER_ACTIONS.UPDATE_SUBMITTING_FORM: {
      return produce(state, (draftState) => {
        draftState.submittingForm = action.payload;
      });
    }
    case FORM_REDUCER_ACTIONS.RESET_CURRENT_FORM_DETAILS: {
      return produce(state, (draftState) => {
        draftState.currentForm.fields = [];
      });
    }
    default:
      return state;
  }
};
