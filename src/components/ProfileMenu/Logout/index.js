import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';
import LogoutIcon from '../SvgIcon/LogoutIcon';

const Logout = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <View style={styles.container}>
        <LogoutIcon width={30} height={40} color="red" />
        <Text style={styles.text}>Log out</Text>
      </View>
    </ItemWrapper>
  );
};

export default Logout;
