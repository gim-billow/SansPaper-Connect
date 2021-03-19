import R from 'ramda';

import {getOrgNews} from '@api/common';
import {fetchUserEmail} from '@api/upvise';
import {getUpviseTemplate} from '@api/forms';

export const fetchOrgNews = async (orgPath) => {
  let orgNews = await getOrgNews(`${orgPath}/announcements`);
  const diff = function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  const sortedDate = R.sort(diff, orgNews);

  if (orgNews) {
    return sortedDate;
  }
};

export const fetchUserDetails = async () => {
  try {
    const userEmail = await fetchUserEmail();
    return userEmail;
  } catch (e) {
    console.log('Error getting user details from firebase', e);
  }
};

export const getUpviseTemplateForms = async (orgPath) => {
  const upviseForms = await getUpviseTemplate({
    organisationPath: `${orgPath}/upviseTemplates`,
  });

  return upviseForms;
};
