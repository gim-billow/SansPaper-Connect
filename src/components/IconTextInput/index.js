import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {lightGrey, darkGrey} from 'styles/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderColor: lightGrey,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    borderRadius: 3,
  },
  icon: {
    width: '15%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textInput: {
    color: darkGrey,
    width: '70%',
    backgroundColor: 'white',
  },
});

const IconTextInput = ({secureTextEntry = false, ...props}) => {
  const {
    onChangeText,
    placeHolder,
    iconProps,
    iconEyeProps,
    onPressIcon,
  } = props;

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} {...iconProps} />
      <TextInput
        style={styles.textInput}
        placeholder={placeHolder}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(text)}
      />
      <Icon
        style={styles.icon}
        {...iconEyeProps}
        onPress={() => onPressIcon()}
      />
    </View>
  );
};

export default IconTextInput;
