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

export const getProjects = async (organisation) => {
  return await queryUpviseTable({
    table: UpviseTablesMap['projects.projects'],
    organisation,
    where: "status = '0'",
  });
};

export const getDataWithoutStatus = async (organisation, tableMap) => {
  return await queryUpviseTable({
    table: UpviseTablesMap[tableMap],
    organisation,
  });
};
