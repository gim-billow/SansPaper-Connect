import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {lightGrey, darkGrey, red} from 'styles/colors';
import {spaceRegular} from 'styles/space';
import {Input} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spaceRegular,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: lightGrey,
    paddingHorizontal: 10,
  },
  text: {
    paddingHorizontal: 5,
    color: darkGrey,
  },
  error: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: red,
    paddingHorizontal: 10,
  },
  errorView: {
    flex: 1,
    marginBottom: 1,
  },
});

const IconTextInput = ({secureTextEntry = false, ...props}) => {
  const {
    onChangeText,
    placeHolder,
    iconProps,
    iconEyeProps,
    onPressIcon,
    error,
    value,
  } = props;

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeHolder}
        leftIcon={<Icon {...iconProps} style={{width: 20}} />}
        rightIcon={
          value ? (
            <Icon {...iconEyeProps} onPress={() => onPressIcon()} />
          ) : null
        }
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        inputContainerStyle={!error ? styles.inputContainer : styles.error}
        inputStyle={styles.text}
        errorMessage={error}
        value={value}
        onChangeText={onChangeText}
        errorStyle={!error ? styles.errorView : undefined}
      />
    </View>
  );
};

export default IconTextInput;
