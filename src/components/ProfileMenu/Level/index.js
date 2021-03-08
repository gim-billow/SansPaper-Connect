import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';

const Level = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Button style={styles.button}>Level</Button>
        <Text style={styles.text}>: {item.points} points</Text>
      </View>
    </ItemWrapper>
  );
};

export default Level;
