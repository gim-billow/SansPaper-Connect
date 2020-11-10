export const FORM_ACTION = {
  LOAD_FORM_FIELDS: 'formActions/LOAD_FORM_FIELDS',
  UPDATE_FORM_FIELD_VALUE: 'formActions/UPDATE_FORM_FIELD_VALUE',
};

export const FORM_SAGA_ACTIONS = {
  WATCH_FORM_UPDATES: 'formActions/WATCH_FORM_UPDATES',
  GET_ALL_LINKED_ITEMS: 'formActions/GET_ALL_LINKED_ITEMS',
  LOAD_LINKED_TABLE_TO_STORE: 'formActions/LOAD_LINKED_TABLE_TO_STORE',
};

export const FORM_REDUCER_ACTIONS = {
  UPDATE_ORGANISATION_PATH: 'formAcions/UPDATE_ORGANISATION_PATH',
  UPDATE_CURRENT_LINKED_TABLE: 'formActions/UPDATE_CURRENT_LINKED_TABLE',
  UPDATE_CURRENT_FORM_ID: 'formAcions/UPDATE_CURRENT_FORM_ID',
  UPDATE_CURRENT_FORM: 'formAcions/UPDATE_CURRENT_FORM',
  UPDATE_FORM_LIST: 'formAcions/UPDATE_FORM_LIST',
};

export const loadLinkedItems = (payload) => ({
  type: FORM_SAGA_ACTIONS.LOAD_LINKED_TABLE_TO_STORE,
  payload,
});

export const loadFormFields = (payload) => ({
  type: FORM_ACTION.LOAD_FORM_FIELDS,
  payload,
});

export const updateCurrentFormId = (payload) => ({
  type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_ID,
  payload,
});
