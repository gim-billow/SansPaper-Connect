import {queryUpviseTable} from '.';
import {UpviseTablesMap} from '@constant/UpviseTablesMap';

export const getOptions = async (table, where, organisation) => {
  return await queryUpviseTable({
    table: UpviseTablesMap[table],
    organisation,
    where,
  });
};

export const getToolGroups = async (organisation) => {
  return await queryUpviseTable({
    table: UpviseTablesMap['tools.tools'],
    organisation,
  });
};
