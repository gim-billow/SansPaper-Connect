export const NAVIGATE_ACTIONS = {
  GO_TO_LOGIN: 'navigateActions/GO_TO_LOGIN',
  GO_TO_MAIN_SCREEN: 'navigateActions/GO_TO_MAIN_SCREEN',
};

export const goToLogin = () => ({
  type: NAVIGATE_ACTIONS.GO_TO_LOGIN,
});

export const goToMainScreen = () => ({
  type: NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN,
});
