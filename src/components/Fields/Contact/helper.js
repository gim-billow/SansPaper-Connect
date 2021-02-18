import {getOptions} from '@api/upvise/util';
import {map, pick} from 'ramda';

const getContact = async (organization, project) => {
  const table = 'contacts.contacts';
  const query = 'groupid="' + project + '"';
  const queriedOptions = await getOptions(table, query, organization);
  return map(
    (options) => pick(['id', 'name'], options),
    queriedOptions?.data?.items,
  );
};

export const getQueryByOptions = async (props) => {
  const {seloptions} = props.item;
  const {organization} = props;

  return getContact(organization, seloptions);
};
