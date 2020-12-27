import {regExpQuote, regExpDoubleQuote} from '@util/regexp';
import {getOptions, getToolGroups} from '@api/upvise/util';
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

const getCategoriesOptions = async (organization) => {
  const table = 'tools.tools'; //we're getting the milestones.
  const query = 'groupid="' + this.state.valProject + '"';
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

const getMilestoneOptions = async (organization) => {
  const table = 'projects.milestones'; //we're getting the milestones.
  const query = 'projectid="' + valProject +'"';
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
}

export const getQueryByOptions = async (props) => {
  const {seloptions} = props.item;
  const {organization} = props;

  if (seloptions.includes('Query.options')) {
    return getQueryOptions(seloptions, organization);
  } else if (seloptions.includes('tools.group')) {
    return getToolGroupsOptions(organization);
  } else if (seloptions.includes('categorizedTools')) {
    return getCategoriesOptions(organization);
  } else if (seloptions.includes('milestone')) {
    return getMilestoneOptions(organization)
  } else {
    return pipe(
      split('|'),
      map((opt, i) => {
        const optArr = split(':', opt);
        return {id: optArr[0], name: optArr[1] || optArr[0]};
      }),
    )(seloptions);
  }
};
