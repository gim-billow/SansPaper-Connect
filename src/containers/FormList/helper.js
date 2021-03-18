import {getUpviseTemplate} from '@api/forms';

export const getUpviseTemplateForms = async (orgPath) => {
  const upviseForms = await getUpviseTemplate({
    organisationPath: `${orgPath}/upviseTemplates`,
  });

  return upviseForms;
};
