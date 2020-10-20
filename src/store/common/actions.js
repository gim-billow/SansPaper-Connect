export const COMMON_ACTIONS = {
  INIT: 'initActions/INIT',
};

export const COMMON_REDUCER_ACTIONS = {
  UPDATE_FORM_INIT: 'initAction/UPDATE_FORM_INIT',
  UPDATE_FORM_FIELDS_INIT: 'initAction/UPDATE_FORM_FIELDS_INIT',
  UPDATE_LINKED_ITEMS_INIT: 'initAction/UPDATE_LINKED_ITEMS_INIT',
};

export const init = (payload) => ({
  type: COMMON_ACTIONS.INIT,
  payload,
});

export const updateFormInit = (payload) => ({
  type: COMMON_REDUCER_ACTIONS.UPDATE_FORM_INIT,
  payload,
});

export const updateFormFieldsInit = (payload) => ({
  type: COMMON_REDUCER_ACTIONS.UPDATE_FORM_FIELDS_INIT,
  payload,
});

export const updateLinkedItemsInit = (payload) => ({
  type: COMMON_REDUCER_ACTIONS.UPDATE_LINKED_ITEMS_INIT,
  payload,
});
