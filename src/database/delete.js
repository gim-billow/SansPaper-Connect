import DB from './DB';
import {
  deleteAllFormsQuery,
} from './query';

export const deleteAllForms = async () => {
  try {
    await DB.ExecuteQuery(deleteAllFormsQuery);
  } catch (e) {
    console.log('DB InsertForm Error', e);
    return [];
  }
};