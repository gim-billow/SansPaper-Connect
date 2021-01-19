import {regExpQuote, regExpDoubleQuote} from '@util/regexp';
import {
  getOptions,
  getToolGroups,
  getProjects,
  getDataWithoutStatus,
} from '@api/upvise/util';
import {pipe, split, map, pick} from 'ramda';

const getQueryOptions = async (seloptions, organization) => {
  const queryArr = seloptions.split(',');
  const table = regExpQuote.exec(queryArr[0])[1];
  const query = regExpDoubleQuote.exec(queryArr[1])[1];
  const queriedOptions = await getOptions(table, query, organization);

  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getToolGroupsOptions = async (organization) => {
  const queriedOptions = await getToolGroups(organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getCategoriesOptions = async (organization, project) => {
  const table = 'tools.tools'; //we're getting the milestones.
  const query = 'groupid="' + project + '"';
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getMilestoneOptions = async (organization, project) => {
  const table = 'projects.milestones'; //we're getting the milestones.
  const query = 'projectid="' + project + '"';
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getProjectOptions = async (organization) => {
  const queriedOptions = await getProjects(organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getWithoutStatus = async (organization, table) => {
  const queriedOptions = await getDataWithoutStatus(organization, table);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

export const getQueryByOptions = async (props, project, type) => {
  const {seloptions} = props.item;
  const {organization} = props;

  switch (type) {
    case 'select': {
      if (seloptions.includes('Query.options')) {
        return getQueryOptions(seloptions, organization);
      } else if (seloptions.includes('tools.group')) {
        return getToolGroupsOptions(organization);
      } else if (seloptions.includes('categorizedTools')) {
        return getCategoriesOptions(organization, project);
      } else if (seloptions.includes('milestone')) {
        return getMilestoneOptions(organization, project);
      } else {
        return pipe(
          split('|'),
          map((opt, i) => {
            const optArr = split(':', opt);
            return {id: optArr[0], name: optArr[1] || optArr[0]};
          }),
        )(seloptions);
      }
    }
    case 'project':
      return getProjectOptions(organization);
    case 'product':
      return getWithoutStatus(organization, 'sales.products');
    case 'opp':
      return getWithoutStatus(organization, 'sales.opportunities');
    case 'asset':
      return getWithoutStatus(organization, 'assets.assets');
    case 'tool':
      return getWithoutStatus(organization, 'tools.tools');
    case 'form':
      return getWithoutStatus(organization, 'forms.forms');
    case 'file':
      return getWithoutStatus(organization, 'system.files');
    default:
  }
};
