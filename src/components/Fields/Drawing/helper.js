import axios from 'axios';

const uuid = require('uuid/v4');

export const syncImageInUpvise = async (payload) => {
  try {
    let id = uuid();
    let formatId = id.split('-').join('').toUpperCase();
    const finalId = formatId.substring(2, formatId.length);

    const body = {
      items: [
        {
          id: payload.imgId,
          _table: 'system.user.files',
          _type: 'DELETE',
        },
        {
          content: payload.base64,
          date: payload.fileStat.lastModified,
          id: finalId,
          mime: 'image/jpg',
          name: payload.fileStat.filename,
          size: payload.fileStat.size,
          _table: 'system.user.files',
        },
        {
          id: payload.fieldId,
          value: finalId,
          _table: 'system.user.files',
        },
      ],
      lastBuildDate: payload.fileStat.lastModified,
      token: payload.token,
    };

    // this may not be the best practice, but its a workaround
    // for the meantime
    const response = await axios.post(
      'https://www.upvise.com/uws/v2/sync',
      body,
    );

    return {...response, valueImgId: finalId};
  } catch (e) {
    console.trace();
    console.log('Error in postSansPaperUpviseFormStorage', e);
  }
};
