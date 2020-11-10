// import {createSelector} from 'reselect';
export const selectUser = (state) => state.sanspaperReducer.user;
export const selectUserList = (state) => state.sanspaperReducer.usersList;

export const selectOrganistationPath = (state) =>
  state.sanspaperReducer.organisationPath;

export const selectOrganistation = (state) =>
  state.sanspaperReducer.organisation;

export const selectUpviseTemplatePath = (state) =>
  state.sanspaperReducer.upviseTemplatePath;
