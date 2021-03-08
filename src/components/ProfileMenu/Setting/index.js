import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';

const Setting = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <Text style={styles.text}>{item.label}</Text>
      <View style={styles.container}>
        <Button style={styles.button}>Font Size</Button>
      </View>
    </ItemWrapper>
  );
};

export default Setting;
