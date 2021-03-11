import * as React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from './styles';
import {ListItem} from 'react-native-elements';
import ItemWrapper from '../../Fields/ItemWrapper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Setting = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return (
    <View style={{padding: 10, borderBottomWidth: 0.4, borderColor: 'gray'}}>
      <ItemWrapper>
        <View style={styles.container}>
          <MaterialIcons name="settings" size={30} style={styles.icon} />
          <Text style={styles.text}>FONT SIZE</Text>
        </View>
      </ItemWrapper>
    </View>
  );
};

export default Setting;
