import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../../Fields/ItemWrapper';
import MailIcon from '../SvgIcon/MailIcon';

const Email = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <View style={{padding: 10, borderBottomWidth: 0.4, borderColor: 'gray'}}>
      <ItemWrapper>
        <View style={styles.container}>
          <MailIcon width={30} height={40} color="green" />
          <View style={styles.textView}>
            <Text>EMAIL</Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>
        </View>
      </ItemWrapper>
    </View>
  );
};

export default Email;
