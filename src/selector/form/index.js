// import {createSelector} from 'reselect';
import {createSelector} from 'reselect';
import {find, propEq, filter} from 'ramda';
import * as R from 'ramda';

export const selectCurrentFormId = (state) => state.formReducer.currentFormId;

export const selectCurrentLinkedItems = (state) =>
  state.formReducer.currentLinkedItems;

export const selectFormList = (state) => state.formReducer.forms;

export const selectCurrentForm = (state) => state.formReducer.currentForm;

export const selectIsSubmittingForm = (state) => state.formReducer.currentForm;

export const selectScrollToMandatory = (state) =>
  state.formReducer.scrollToMandatory;

export const selectSubmitTriggered = (state) =>
  state.formReducer.submitTriggered;

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

export const selectCurrentFormUnfillMandatoryFields = createSelector(
  selectCurrentFormFields,
  (formFields) =>
    filter(
      (field) =>
        (field.mandatory === 1 && (field.value === '' || !field.value)) ||
        (field.mandatory === 1 &&
          field.value === 0 &&
          field.label === 'datetime'),
      formFields,
    ),
);

export const selectProjectValue = createSelector(
  selectCurrentFormFields,
  (fields) => (fields && fields.length > 0 ? fields[0].value : ''),
);

export const selectStartAndFinishDate = createSelector(
  selectCurrentFormFields,
  (fields) => {
    // check start/finish date time
    let startDateTime = '';
    let finishDateTime = '';
    let dateTimelist = [];
    let rank = null;
    for (let item of fields) {
      if (item.type === 'datetime') {
        if (item.label.toLowerCase().includes('start')) {
          startDateTime = item.value;
          rank = item.rank;
        }

        if (item.label.toLowerCase().includes('finish')) {
          finishDateTime = item.value;
          dateTimelist.push({startDateTime, finishDateTime, rank});
        }
      }
    }
    return dateTimelist;
  },
);

export const selectIfStartAndFinishDateCompleted = createSelector(
  selectCurrentFormFields,
  (fields) => {
    // check start/finish date time
    let startDateTime = '';
    let rank = 0;
    let finishDateTime = '';
    let dateTimelist = [];
    for (let item of fields) {
      if (item.type === 'datetime') {
        if (item.label.toLowerCase().includes('start')) {
          startDateTime = item.value;
          rank = item.rank;
        }

        if (item.label.toLowerCase().includes('finish')) {
          finishDateTime = item.value;
          dateTimelist.push({startDateTime, finishDateTime, rank});
        }
      }
    }
    return dateTimelist;
  },
);

export const selectFormByCurrentId = createSelector(
  selectFormList,
  selectCurrentFormId,
  (formList, formId) => find(propEq('id', formId))(formList),
);

export const selectProjectMilestone = (state) => state.formReducer.projectId;
