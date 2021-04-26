import {regExpQuote, regExpDoubleQuote} from '@util/regexp';
import {getUpviseUserList} from '@api/upvise';
import {getOptions, getProjects, getDataWithoutStatus} from '@api/upvise/util';
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

// TODO:
const getProjectMilestonesOptions = async (organization, project) => {
  // const startOfQuery = project.indexOf('Query.options');
  // const startOfQuery = (x) => {
  //   const index = x.indexOf('Query.options');
  //   return x.substring(index, x.length - 1);
  // };
  // const endOfQuery = (y) => {
  //   const idx = y.indexOf(';');
  //   return y.substring(0, idx);
  // };

  // const getQueryForMilestone = pipe(startOfQuery, endOfQuery)(project);
  // const getMilestoneTable = getQueryForMilestone
  //   .replace('Query.options(', '')
  //   .replace(/'/g, '');
  // const finalTable = getMilestoneTable.split(',')[0];

  const queryHandle = project.split(',');

  const table = queryHandle[0].replace('=Query.options(', '').replace(/'/g, '');
  const query = queryHandle[1]
    .replace(')', '')
    .replace(/"/g, '')
    .replace(/'/g, '"')
    .trim();

  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getProjectOptions = async (organization, project) => {
  const queryHandle = project.split(',');
  const table = queryHandle[0].replace('=Query.options(', '').replace(/'/g, '');
  const query = queryHandle[1].replace(');', '').replace(/"/g, '').trim();

  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getToolGroupsOptions = async (organization, project) => {
  const queryHandle = project.split(',');
  const table = queryHandle[0].replace('=Query.options(', '').replace(/'/g, '');
  const query = queryHandle[1].replace(');', '').replace(/"/g, '').trim();

  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getToolsOptions = async (organization, seloptions) => {
  const queryHandle = seloptions.split(',');
  const table = regExpQuote.exec(queryHandle[0])[1];

  let query;
  let otherQuery;

  if (queryHandle.length === 2) {
    if (!queryHandle[1].includes('`')) {
      query = regExpDoubleQuote
        .exec(queryHandle[1])[1]
        .replace(/'/g, '"')
        .trim();
    } else {
      query = queryHandle[1]
        .replace('`', '')
        .replace('`);', '')
        .replace(/'/g, '"');
    }
  } else if (queryHandle.length === 3) {
    query = queryHandle[1]
      .replace(/"([^"]+(?="))"/g, '$1')
      .replace(/'/g, '"')
      .replace(/3/g, 't3')
      .trim();

    otherQuery = queryHandle[2].replace(');', '').replace(/'/g, '').trim();

    query = query + '&' + otherQuery;
  }

  const queriedOptions = await getOptions(table, query, organization);
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

const getProject = async (organization) => {
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

const getContact = async (organization, project) => {
  const table = 'contacts.contacts';
  const query = project ? 'groupid="' + project + '"' : null;
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

export const getQueryByOptions = async (
  seloptions,
  type,
  organization,
  projectValue,
) => {
  switch (type) {
    case 'selectmulti':
    case 'select': {
      // the project name check order have to be in the current order, otherwise milestone will be missed
      if (seloptions.includes('tools.group')) {
        return getToolGroupsOptions(organization, seloptions);
      } else if (seloptions.includes('tools.tools')) {
        return getToolsOptions(organization, seloptions);
      } else if (seloptions.includes('projects.milestones')) {
        // return getProjectMilestonesOptions(organization, seloptions);
        return getMilestoneOptions(organization, projectValue);
      } else if (seloptions.includes('projects.projects')) {
        return getProjectOptions(organization, seloptions);
      } else if (seloptions.includes('categorizedTools')) {
        return getCategoriesOptions(organization, projectValue);
      } else if (seloptions.includes('milestone')) {
        return getMilestoneOptions(organization, projectValue);
      } else if (seloptions.includes('Query.options')) {
        return getQueryOptions(seloptions, organization);
      } else {
        return pipe(
          split('|'),
          map((opt, i) => {
            const items = opt.replace('\n', '');
            const optArr = split(':', items.replace('\n ', ''));
            return {
              id: optArr[0],
              name: optArr[1] || optArr[0],
            };
          }),
        )(seloptions);
      }
    }
    case 'contact':
      return getContact(organization, seloptions);
    case 'company':
      return getWithoutStatus(organization, 'contacts.companies');
    case 'project':
      return getProject(organization);
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
    case 'user':
      return getUpviseUserList(
        organization.upviseUrl,
        organization.upviseToken,
      );
    default:
      return '';
  }
};
