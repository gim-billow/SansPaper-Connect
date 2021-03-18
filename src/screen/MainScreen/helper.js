import {getOrgNews} from '@api/common';
import {fetchUserEmail} from '@api/upvise';
import {getUpviseTemplate} from '@api/forms';

export const fetchOrgNews = async (orgPath) => {
  let orgNews = await getOrgNews(`${orgPath}/announcements`);
  if (orgNews) {
    return orgNews;
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
