import DB from './DB';
import {
  insertFormQuery,
  createFormsTable,
  createLinkedItemsTable,
  insertLinkedItemsQuery,
  insertSelectOptionsQuery,
  createSelectOptionsTable,
} from './query';

export const InsertForm = async (payload) => {
  try {
    await DB.ExecuteQuery(insertFormQuery, payload);
  } catch (e) {
    console.log('DB InsertForm Error', e);
    return [];
  }
};

export const InsertLinkedItems = async (payload) => {
  try {
    await DB.ExecuteQuery(insertLinkedItemsQuery, payload);
  } catch (e) {
    console.log('DB InsertLinkedItems Error', e);
    return [];
  }
};

export const InsertSelectOptions = async (payload) => {
  try {
    await DB.ExecuteQuery(insertSelectOptionsQuery, payload);
  } catch (e) {
    console.log('DB InsertSelectOptions Error', e);
    return [];
  }
};

export const CreateTable = async () => {
  try {
    await DB.ExecuteQuery(createFormsTable, []);
    await DB.ExecuteQuery(createLinkedItemsTable, []);
    await DB.ExecuteQuery(createSelectOptionsTable, []);
  } catch (e) {
    console.error('create table error ', e);
  }
};
