import {firebase} from '@react-native-firebase/firestore';

export const getOrgNews = async (organizationPath) => {
  try {
    const news = [];
    const listNews = await firebase
      .firestore()
      .collection(organizationPath)
      .orderBy('date')
      .get();

    for (let item of listNews.docs) {
      news.push(item.data());
    }

    return news;
  } catch (error) {
    console.warn('Error getting News', error);
  }
};
