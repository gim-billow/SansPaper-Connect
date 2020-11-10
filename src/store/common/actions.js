export const COMMON_ACTIONS = {
  INIT: 'initActions/INIT',
};

export const COMMON_REDUCER_ACTIONS = {
  UPDATE_NEWS: 'initAction/UPDATE_NEWS',
};

export const init = (payload) => ({
  type: COMMON_ACTIONS.INIT,
  payload,
});
