import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {Text} from 'react-native';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const SPText = (props) => {
  const {type, label, rank, value} = props.item;
  const {updateFieldsValue} = props;
  const [text, setText] = React.useState(value ? value : '');

  const onChangeText = (updatedText) => {
    setText(updatedText);
    updateFieldsValue({rank: rank, value: updatedText});
  };

  const keyboard = (types) => {
    switch (types) {
      case 'decimal':
        return 'decimal-pad';
      case 'numeric':
        return 'numeric';
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        label="Insert here"
        mode="outlined"
        keyboardType={keyboard(type)}
        multiline={type !== 'text' ? true : false}
        onChangeText={(updatedText) => onChangeText(updatedText)}
      />
    </ItemWrapper>
  );
};

export default SPText;
