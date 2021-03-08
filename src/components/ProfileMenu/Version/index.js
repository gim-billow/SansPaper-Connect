import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';

const Version = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Text style={styles.text}>Current Version : {item.version}</Text>
      </View>
    </ItemWrapper>
  );
};

export default Version;
