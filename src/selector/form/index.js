// import {createSelector} from 'reselect';
import {createSelector} from 'reselect';
import {find, propEq} from 'ramda';
import * as R from 'ramda';

export const selectCurrentFormId = (state) => state.formReducer.currentFormId;

export const selectCurrentLinkedItems = (state) =>
  state.formReducer.currentLinkedItems;

export const selectFormList = (state) => state.formReducer.forms;

export const selectCurrentForm = (state) => state.formReducer.currentForm;

export const selectSortedFormList = createSelector(selectFormList, (formList) =>
  R.pipe(
    R.sortBy(R.compose(R.toLower, R.prop('name'))),
    R.filter((option) => !R.isNil(option)),
  )(formList),
);

export const selectCurrentFormFields = createSelector(
  selectCurrentForm,
  (form) => (form.fields ? form.fields : []),
);

export const selectProjectValue = createSelector(
  selectCurrentFormFields,
  (fields) => (fields && fields.length > 0 ? fields[0].value : ''),
);

export const selectFormByCurrentId = createSelector(
  selectFormList,
  selectCurrentFormId,
  (formList, formId) => find(propEq('id', formId))(formList),
);
