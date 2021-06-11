export const COMMON_ACTIONS = {
  INIT: 'commonActions/INIT',
  WATCH_NETWORK_STATE: 'commonActions/WATCH_NETWORK_STATE',
  WATCH_APP_STATE: 'commonActions/WATCH_APP_STATE',
};

export const COMMON_REDUCER_ACTIONS = {
  UPDATE_NEWS: 'commonActions/UPDATE_NEWS',
  WATCH_NEWS_UPDATES: 'commonActions/WATCH_NEWS_UPDATES',
  UPDATE_NETWORK_INFO: 'commonAction/UPDATE_NETWORK_INFO',
  UPDATE_APP_STATE: 'commonAction/UPDATE_APP_STATE',
  WATCH_ACTIVE_SCREEN: 'commonAction/WATCH_ACTIVE_SCREEN',
};

export const init = (payload) => ({
  type: COMMON_ACTIONS.INIT,
  payload,
});

export const activeScreen = (payload) => ({
  type: COMMON_REDUCER_ACTIONS.WATCH_ACTIVE_SCREEN,
  payload,
});
