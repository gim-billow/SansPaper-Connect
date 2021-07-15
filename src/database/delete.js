import DB from './DB';
import {
  deleteAllFormsQuery,
  deleteFormByIdQuery,
  deleteOutboxByIdQuery,
  deleteAllOutboxQuery,
} from './query';

export const deleteAllForms = async () => {
  try {
    await DB.ExecuteQuery(deleteAllFormsQuery);
  } catch (e) {
    console.log('DB deleteAllForms Error', e);
    return [];
  }
};

export const deleteAllOutbox = async () => {
  try {
    await DB.ExecuteQuery(deleteAllOutboxQuery);
  } catch (e) {
    console.log('DB deleteAllOutbox Error', e);
    return [];
  }
};

export const deleteFormById = async (formId) => {
  try {
    await DB.ExecuteQuery(deleteFormByIdQuery, formId);
  } catch (e) {
    console.log('DB deleteFormById Error', e);
    return [];
  }
};

export const deleteOutboxById = async (outboxId) => {
  try {
    await DB.ExecuteQuery(deleteOutboxByIdQuery, outboxId);
  } catch (e) {
    console.log('DB deleteOutboxById Error', e);
    return [];
  }
};
