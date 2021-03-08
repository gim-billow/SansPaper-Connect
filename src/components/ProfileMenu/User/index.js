import * as React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import EvilIcons5 from 'react-native-vector-icons/EvilIcons';
import ItemWrapper from '../../Fields/ItemWrapper';

const User = (props) => {
  const {item} = props;
  const userIcon = EvilIcons5.getImageSource('user', 25);
  console.log('profileText', props);
  return (
    <ItemWrapper>
      <View style={styles.container}>
        <EvilIcons5 name="user" size={60} style={styles.icon} />
        <Text style={styles.text}>USER: {item.userName}</Text>
      </View>
    </ItemWrapper>
  );
};

export default User;
