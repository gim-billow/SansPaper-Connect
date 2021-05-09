export const FORM_ACTION = {
  SYNC_OFFLINE_FORM: 'formAction/SYNC_OFFLINE_FORM',
  PRE_SUBMIT_FORM: 'fromAction/PRE_SUBMIT_FORM',
  LOAD_FORM_FIELDS: 'formActions/LOAD_FORM_FIELDS',
  UPDATE_FORM_FIELD_VALUE: 'formActions/UPDATE_FORM_FIELD_VALUE',
  UPDATE_OFFLINE_FORM_FIELD_VALUE:
    'formActions/UPDATE_OFFLINE_FORM_FIELD_VALUE',
};

export const FORM_SAGA_ACTIONS = {
  LOAD_OFFLINE_FORM: 'formActions/LOAD_OFFLINE_FORM',
  WATCH_FORM_UPDATES: 'formActions/WATCH_FORM_UPDATES',
  GET_ALL_LINKED_ITEMS: 'formActions/GET_ALL_LINKED_ITEMS',
};

export const FORM_REDUCER_ACTIONS = {
  UPDATE_CURRENT_FORM_FIELDS: 'formAction/UPDATE_CURRENT_FORM_FIELDS',
  UPDATE_SUBMIT_TRIGGERED: 'formAction/UPDATE_SUBMIT_TRIGGERED',
  UPDATE_SUBMITTING_FORM: 'formAction/UPDATE_SUBMITTING_FORM',
  UPDATE_SCROLL_TO_MANDATORY: 'formAction/UPDATE_SCROLL_TO_MANDATORY',
  UPDATE_ORGANISATION_PATH: 'formAcions/UPDATE_ORGANISATION_PATH',
  UPDATE_CURRENT_LINKED_TABLE: 'formActions/UPDATE_CURRENT_LINKED_TABLE',
  UPDATE_CURRENT_FORM_ID: 'formAcions/UPDATE_CURRENT_FORM_ID',
  UPDATE_CURRENT_FORM: 'formAcions/UPDATE_CURRENT_FORM',
  UPDATE_FORM_LIST: 'formAcions/UPDATE_FORM_LIST',
  UPDATE_OFFLINE_CURRENT_FORM_ID: 'formActions/UPDATE_OFFLINE_CURRENT_FORM_ID',
  UPDATE_OFFLINE_CURRENT_FORM: 'formActions/UPDATE_OFFLINE_CURRENT_FORM',
  UPDATE_OFFLINE_FORM_LIST: 'formActions/UPDATE_OFFLINE_FORM_LIST',
  UPDATE_OFFLINE_LINKED_TABLE: 'formActions/UPDATE_OFFLINE_LINKED_TABLE',
  UPDATE_OFFLINE_CURRENT_FORM_FIELDS:
    'formActions/UPDATE_OFFLINE_CURRENT_FORM_FIELDS',
  RESET_CURRENT_FORM_DETAILS: 'formActions/RESET_CURRENT_FORM_DETAILS',
};

export const syncOfflineForm = (payload) => ({
  type: FORM_ACTION.SYNC_OFFLINE_FORM,
  payload,
});

export const updateOfflineCurrentFormId = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM_ID,
  payload,
});

export const updateOfflineFormFieldValue = (payload) => ({
  type: FORM_ACTION.UPDATE_OFFLINE_FORM_FIELD_VALUE,
  payload,
});

export const loadFormFields = (payload) => ({
  type: FORM_ACTION.LOAD_FORM_FIELDS,
  payload,
});

export const submitForm = (payload) => ({
  type: FORM_ACTION.PRE_SUBMIT_FORM,
  payload,
});

export const updateCurrentFormId = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_ID,
  payload,
});

export const updateFormFieldValue = (payload) => ({
  type: FORM_ACTION.UPDATE_FORM_FIELD_VALUE,
  payload,
});

export const updateFormList = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_FORM_LIST,
  payload,
});

export const updateScrollToMandatory = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_SCROLL_TO_MANDATORY,
  payload,
});

export const updateSubmittingForm = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_SUBMITTING_FORM,
  payload,
});

export const updateSubmitTriggered = () => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_SUBMIT_TRIGGERED,
});

export const resetCurrentFormDetails = () => ({
  type: FORM_REDUCER_ACTIONS.RESET_CURRENT_FORM_DETAILS,
});
