export const NAVIGATE_ACTIONS = {
  GO_TO_LOGIN: 'navigateActions/GO_TO_LOGIN',
  GO_TO_LINK_ITEM_SCREEN: 'navigateActions/GO_TO_LINK_ITEM_SCREEN',
  GO_TO_FORM_FIELDS_SCREEN: 'navigationAction/GO_TO_FORM_FIELDS_SCREEN',
  GO_TO_MAIN_SCREEN: 'navigateActions/GO_TO_MAIN_SCREEN',
  GO_TO_GOOGLE_MAPS: 'navigateActions/GO_TO_GOOGLE_MAPS',
  GO_TO_OFFLINE_FORM_FIELDS_SCREEN:
    'navigateActions/GO_TO_OFFLINE_FORM_FIELDS_SCREEN',
  GO_TO_OFFLINE_LINK_ITEM_SCREEN:
    'navigateActions/GO_TO_OFFLINE_LINK_ITEM_SCREEN',
};

export const goToLogin = () => ({
  type: NAVIGATE_ACTIONS.GO_TO_LOGIN,
});

export const goToLinkedItemScreen = (payload) => ({
  type: NAVIGATE_ACTIONS.GO_TO_LINK_ITEM_SCREEN,
  payload,
});

export const goToFormFieldsScreen = (payload) => ({
  type: NAVIGATE_ACTIONS.GO_TO_FORM_FIELDS_SCREEN,
  payload,
});

export const goToMainScreen = () => ({
  type: NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN,
});

export const goToGoogleMapScreen = (payload) => ({
  type: NAVIGATE_ACTIONS.GO_TO_GOOGLE_MAPS,
  payload,
});

export const goToOfflineLinkedItemScreen = (payload) => ({
  type: NAVIGATE_ACTIONS.GO_TO_OFFLINE_LINK_ITEM_SCREEN,
  payload,
});

export const goToOfflineFormFieldsScreen = (payload) => ({
  type: NAVIGATE_ACTIONS.GO_TO_OFFLINE_FORM_FIELDS_SCREEN,
  payload,
});
