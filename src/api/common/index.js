import {firebase} from '@react-native-firebase/firestore';

export const getOrgNews = async () => {
  try {
    const news = [];
    const listNews = await firebase
      .firestore()
      .collection('announcements')
      .orderBy('date_added')
      .get();
    for (let item of listNews.docs) {
      news.push(item.data());
    }

    return news;
  } catch (error) {
    console.warn('Error getting News', error);
  }
};
