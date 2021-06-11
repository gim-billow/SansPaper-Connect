import produce from 'immer';
import {COMMON_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  news: '',
  networkInfo: {
    isInternetReachable: null,
    date: null,
  },
  appState: '',
  activeScreen: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMMON_REDUCER_ACTIONS.UPDATE_NEWS: {
      return produce(state, (draftState) => {
        draftState.news = action.payload;
      });
    }
    case COMMON_REDUCER_ACTIONS.UPDATE_APP_STATE: {
      return produce(state, (draftState) => {
        draftState.appState = action.payload;
      });
    }
    case COMMON_REDUCER_ACTIONS.UPDATE_NETWORK_INFO: {
      return produce(state, (draftState) => {
        draftState.networkInfo = action.payload;
      });
    }
    case COMMON_REDUCER_ACTIONS.WATCH_ACTIVE_SCREEN: {
      return produce(state, (draftState) => {
        draftState.activeScreen = action.payload;
      });
    }
    default:
      return state;
  }
};
