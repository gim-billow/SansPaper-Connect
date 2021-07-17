export const FORM_ACTION = {
  DELETE_OUTBOX_FORM: 'formAction/DELETE_OUTBOX_FORM',
  DELETE_OFFLINE_FORM: 'formAction/DELETE_OFFLINE_FORM',
  SAVE_AS_DRAFT: 'formAction/SAVE_AS_DRAFT',
  SYNC_OFFLINE_FORM: 'formAction/SYNC_OFFLINE_FORM',
  PRE_SUBMIT_FORM: 'fromAction/PRE_SUBMIT_FORM',
  LOAD_FORM_FIELDS: 'formActions/LOAD_FORM_FIELDS',
  UPDATE_FORM_FIELD_VALUE: 'formActions/UPDATE_FORM_FIELD_VALUE',
  UPDATE_OFFLINE_FORM_FIELD_VALUE:
    'formActions/UPDATE_OFFLINE_FORM_FIELD_VALUE',
  OFFLINE_FORM_SYNC: 'formActions/OFFLINE_FORM_SYNC',
};

export const FORM_SAGA_ACTIONS = {
  LOAD_OUTBOX: 'formActions/LOAD_OUTBOX',
  LOAD_OUTBOX_BY_STATUS: 'formActions/LOAD_OUTBOX_BY_STATUS',
  LOAD_OFFLINE_FORM: 'formActions/LOAD_OFFLINE_FORM',
  WATCH_FORM_UPDATES: 'formActions/WATCH_FORM_UPDATES',
  GET_ALL_LINKED_ITEMS: 'formActions/GET_ALL_LINKED_ITEMS',
  FILTER_OUTBOX_BY: 'formActions/FILTER_OUTBOX_BY',
};

export const FORM_REDUCER_ACTIONS = {
  UPDATE_SENDING_OUTBOX: 'formAction/UPDATE_SENDING_OUTBOX',
  UPDATE_OUTBOX_LIST: 'formAction/UPDATE_OUTBOX_LIST',
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
  RESET_CURRENT_FORM: 'formActions/RESET_CURRENT_FORM',
  RESET_CURRENT_OFFLINE_FORM: 'formActions/RESET_CURRENT_OFFLINE_FORM',
};

export const deleteOutboxForm = (payload) => ({
  type: FORM_ACTION.DELETE_OUTBOX_FORM,
  payload,
});

export const deleteOfflineForm = (payload) => ({
  type: FORM_ACTION.DELETE_OFFLINE_FORM,
  payload,
});

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

export const saveAsDraft = (payload) => ({
  type: FORM_ACTION.SAVE_AS_DRAFT,
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

export const loadAllOutbox = () => ({
  type: FORM_SAGA_ACTIONS.LOAD_OUTBOX,
});

export const loadOutboxByStatus = (payload) => ({
  type: FORM_SAGA_ACTIONS.LOAD_OUTBOX_BY_STATUS,
  payload,
});

export const filterOutboxBy = (payload) => ({
  type: FORM_SAGA_ACTIONS.FILTER_OUTBOX_BY,
  payload,
});

export const resetCurrentForm = () => ({
  type: FORM_REDUCER_ACTIONS.RESET_CURRENT_FORM,
});

export const resetCurrentOfflineForm = () => ({
  type: FORM_REDUCER_ACTIONS.RESET_CURRENT_OFFLINE_FORM,
});

export const offlineFormSync = () => ({
  type: FORM_ACTION.OFFLINE_FORM_SYNC,
});
