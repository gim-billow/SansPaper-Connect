import React, {useState} from 'react';
import {View, Text} from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import {Button} from 'react-native-paper';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

const Signature = (props) => {
  const {label, rank} = props.item;
  const {updateFieldsValue} = props;
  const [signature, setSignature] = useState('');
  const [show, setShow] = useState(true);
  const [changeTheme, setChangeTheme] = useState(false);

  const signaturePadError = (error) => {
    console.error(error);
  };

  const signaturePadClear = () => {
    setChangeTheme(false);
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 0);
    updateFieldsValue({rank: rank, value: ''});
  };

  const signaturePadChange = ({base64DataUrl}) => {
    setSignature(base64DataUrl.replace('data:image/png;base64,', ''));
  };

  const signaturePadSave = () => {
    setChangeTheme(true);
    updateFieldsValue({rank: rank, value: signature});
  };

  return (
    <ItemWrapper>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.signature}>
          {show ? (
            <SignaturePad
              onError={signaturePadError}
              onChange={signaturePadChange}
              style={styles.signatureColor}
              resizeHeight={200}
              resizeWidth={300}
            />
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              mode="contained"
              style={styles.buttonColor}
              onPress={signaturePadClear}>
              <Text style={styles.text}>Clear Signature</Text>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              mode="contained"
              style={
                changeTheme === true
                  ? styles.ChangeButtonColor
                  : styles.buttonColor
              }
              onPress={signaturePadSave}>
              <Text
                style={
                  changeTheme === true ? styles.ChangeTextColor : styles.text
                }>
                {changeTheme === true ? 'Signature Saved' : 'Save Signature'}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ItemWrapper>
  );
};

export default Signature;
