import DB from './DB';
import {getItemsFromResult} from './helper';
import {
  getOfflineFormsQuery,
  getLinkedItemsByIdQuery,
  getFieldsOptionsQuery,
} from './query';

export const getLinkedItemsByid = async (linkedItemsId) => {
  try {
    const result = await DB.ExecuteQuery(
      getLinkedItemsByIdQuery,
      linkedItemsId,
    );
    const linkedItems = getItemsFromResult(result);
    return linkedItems.length > 0 && linkedItems[0].value;
  } catch (e) {
    console.log('DB getLinkedItemsByid Error', e);
    return [];
  }
};

export const getOfflineForms = async () => {
  try {
    const result = await DB.ExecuteQuery(getOfflineFormsQuery);
    const offlineForms = getItemsFromResult(result);
    return offlineForms;
  } catch (e) {
    console.log('DB getOfflineForms Error', e);
    return [];
  }
};

export const getFieldsOptions = async (params) => {
  try {
    const result = await DB.ExecuteQuery(getFieldsOptionsQuery, params);
    const offlineFieldsOptions = getItemsFromResult(result);
    return JSON.parse(offlineFieldsOptions[0].options);
  } catch (e) {
    console.log('DB getOfflineForms Error', e);
    return [];
  }
};
