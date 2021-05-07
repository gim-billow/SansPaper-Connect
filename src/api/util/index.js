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

export const combineArr = (first, second) => {
  return first.reduce((key, val, index) => {
    key[val] = second[index];
    return key;
  }, {});
};
