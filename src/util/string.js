export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const limitText = (text, limit = null) => {
  if (text.length < limit) {
    return text;
  }

  return text.substring(0, limit || 15) + '...';
};
