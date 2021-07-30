import React, {useEffect, useState} from 'react';
import {Text, View, Image as RNImage} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import styles from './styles';
import {commonStyles} from '@styles/common';

const Image = (props) => {
  const [imgData, setImgData] = useState(null);
  const {label} = props.item;

  useEffect(() => {
    const {value} = props.item;

    const imageUrl = `https://www.upvise.com/uws/downloadfile/?id=${
      value ? value : '6A4A9F42DDFBDE79D92681F6BCD54B'
    }&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB`;

    RNFetchBlob.fetch('GET', imageUrl).then((res) => {
      setImgData(`data:image/jpeg;base64,${res.data}`);
    });
  }, [props.item]);

  return (
    <>
      <View style={styles.container}>
        <Text style={commonStyles.title}>{label}</Text>
        <RNImage
          source={{uri: imgData}}
          resizeMode="center"
          resizeMethod="scale"
          style={styles.image}
        />
      </View>
      {/* <Divider /> */}
    </>
  );
};

export default Image;
