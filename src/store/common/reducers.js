import produce from 'immer';
import {COMMON_REDUCER_ACTIONS} from './actions';

const INIT_STATE = {
  news: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMMON_REDUCER_ACTIONS.UPDATE_NEWS: {
      return produce(state, (draftState) => {
        draftState.news = action.payload;
      });
    }
    default:
      return state;
  }
};
