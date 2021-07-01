export const selectUserStatus = (state) => state.userReducer.loginStatus;
export const selectLoginCode = (state) => state.userReducer.loginCode;
export const selectEmail = (state) => state.userReducer.email;
export const selectSaveUser = (state) => state.userReducer.saveUser;
export const selectProfilePicture = (state) => state.userReducer.profilePic;
export const selectUID = (state) => state.userReducer.uid;
export const selectOfflineFeature = (state) => state.userReducer.offlineFeature;
export const selectBetaAccess = (state) => state.userReducer.betaAccess;
