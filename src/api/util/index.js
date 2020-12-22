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

export const sortByStringField = (data, field) => {
  return data.sort((a, b) => {
    return a[field].toLowerCase() < b[field].toLowerCase()
      ? -1
      : a[field].toLowerCase() === b[field].toLowerCase()
      ? 0
      : 1;
  });
};
