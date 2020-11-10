import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {Text} from 'react-native';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const SPText = (props) => {
  const [text, setText] = React.useState('');
  const {label, rank} = props.item;
  const {updateFieldsValue} = props;
  const keyboardType = props.keyboardType ? props.keyboardType : 'default';

  const onChangeText = (updatedText) => {
    setText(updatedText);
    updateFieldsValue({rank: rank, value: updatedText});
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={text}
        label="Insert here"
        mode="outlined"
        keyboardType={keyboardType}
        multiline
        onChangeText={(updatedText) => onChangeText(updatedText)}
      />
    </ItemWrapper>
  );
};

export default SPText;
