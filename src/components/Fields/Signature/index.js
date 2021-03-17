import React, {useState, createRef} from 'react';
import {View, Text, Platform} from 'react-native';
import {Divider} from 'react-native-elements';
import SignaturePad from 'react-native-signature-pad'; // ios
import SignatureCapture from 'react-native-signature-capture'; // android
import {Button} from 'react-native-paper';

import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';

const Signature = (props) => {
  let refInput = createRef();
  const {label, rank, mandatory} = props.item;
  const {updateFieldsValue} = props;
  const [signature, setSignature] = useState('');
  const [signatureSaved, setSignaturesSaved] = useState(false);
  const [show, setShow] = useState(true);
  const [changeTheme, setChangeTheme] = useState(false);

  const signaturePadError = (error) => {
    console.error(error);
  };

  const signaturePadClear = () => {
    if (Platform.OS === 'android') {
      refInput.resetImage();
    }

    setChangeTheme(false);
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 0);
    updateFieldsValue({rank: rank, value: ''});

    setSignaturesSaved(false);
  };

  const signaturePadChange = ({base64DataUrl}) => {
    setSignature(base64DataUrl.replace('data:image/png;base64,', ''));
  };

  const signaturePadSave = () => {
    setChangeTheme(true);
    if (Platform.OS === 'android') {
      refInput.saveImage();
    } else {
      updateFieldsValue({rank: rank, value: signature});
    }
    setSignaturesSaved(true);
  };

  const _onSaveEvent = (result) => {
    updateFieldsValue({rank: rank, value: result.encoded});
  };

  const _onDragEvent = (data) => {
    // console.log(data);
  };

  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Text style={commonStyles.text}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View>
          {Platform.OS === 'android' ? (
            <View style={styles.signView}>
              <SignatureCapture
                ref={(sign) => (refInput = sign)}
                style={styles.droidSignature}
                onSaveEvent={_onSaveEvent}
                onDragEvent={_onDragEvent}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={'portrait'}
              />
              {signatureSaved && <View style={styles.dimmedSingature} />}
            </View>
          ) : (
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
              {signatureSaved && <View style={styles.dimmedSingature} />}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.leftButton}>
              <Button
                mode="contained"
                style={styles.buttonColor}
                onPress={signaturePadClear}>
                <Text style={styles.text}>Clear Signature</Text>
              </Button>
            </View>
            <View style={styles.rightButton}>
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
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default Signature;
