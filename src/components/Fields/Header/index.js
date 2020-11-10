import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

//styles
import {medium} from '@styles/font';
import {spaceSmall} from '@styles/space';
import {lightGrey} from '@styles/colors';

const styles = StyleSheet.create({
  container: {
    padding: spaceSmall,
    backgroundColor: lightGrey,
  },
  text: {
    fontSize: medium,
  },
});

const Header = (props) => {
  const {label} = props.item;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Header;
