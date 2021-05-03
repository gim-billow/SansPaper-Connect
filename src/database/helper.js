export function getItemsFromResult(result, normalizeItem) {
  if (!result?.rows?.length) {
    return [];
  }

  const items = [];

  for (let idx = 0; idx < result.rows.length; idx++) {
    const item = normalizeItem
      ? normalizeItem(result.rows.item(idx))
      : result.rows.item(idx);

    items.push(item);
  }

  return items;
}
