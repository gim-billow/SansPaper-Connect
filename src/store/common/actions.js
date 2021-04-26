export const COMMON_ACTIONS = {
  INIT: 'commonActions/INIT',
};

export const COMMON_REDUCER_ACTIONS = {
  UPDATE_NEWS: 'commonActions/UPDATE_NEWS',
  WATCH_NEWS_UPDATES: 'commonActions/WATCH_NEWS_UPDATES',
};

export const init = (payload) => ({
  type: COMMON_ACTIONS.INIT,
  payload,
});
