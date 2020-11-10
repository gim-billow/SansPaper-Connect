export const getUpviseTabledQueryData = (payload) => {
  const {auth, table, where} = payload;
  const data = new FormData();
  data.append('auth', auth);
  data.append('table', table);

  if (where) {
    data.append('where', where);
  }
  return data;
};
