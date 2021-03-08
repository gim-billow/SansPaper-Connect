import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';

const Logout = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Button style={styles.button}>Log out</Button>
      </View>
    </ItemWrapper>
  );
};

export default Logout;
