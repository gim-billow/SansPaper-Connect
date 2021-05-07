import {createSelector} from 'reselect';
import * as R from 'ramda';
import {diff} from '@util/general';

export const selectNews = (state) => state.commonReducer.news;

export const selectSortedNews = createSelector(selectNews, (newsList) =>
  R.sort(diff, newsList),
);
