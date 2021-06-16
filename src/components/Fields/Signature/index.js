import React, {useState, useEffect, createRef, useRef} from 'react';
import {View, Text, Platform} from 'react-native';
import {Divider} from 'react-native-elements';
// import SignaturePad from 'react-native-signature-pad'; // ios
import SignatureScreen from 'react-native-signature-canvas'; // ios
import SignatureCapture from 'react-native-signature-capture'; // android
import {Button} from 'react-native-paper';

import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';

const Signature = (props) => {
  let refInput = createRef();
  const refInputIOS = useRef();
  const {label, rank, mandatory} = props.item;
  const {updateFieldsValue, isEditable} = props;
  const [iosSig, setIosSig] = useState('');
  const [signatureSaved, setSignaturesSaved] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    const {value} = props.item;

    if (value) {
      if (Platform.OS === 'android') {
        // TODO: cannot test since sql storage in android has issues
      } else if (Platform.OS === 'ios') {
        setIosSig('data:image/png;base64,' + value);
        setSignaturesSaved(true);
        setChangeTheme(true);
      }
    }
  }, [props.item]);

  const signaturePadClear = () => {
    if (Platform.OS === 'android') {
      refInput.resetImage();
    } else {
      refInputIOS.current.clearSignature();
    }

    setChangeTheme(false);
    updateFieldsValue({rank: rank, value: ''});

    setSignaturesSaved(false);
  };

  const signaturePadSave = () => {
    setChangeTheme(true);
    if (Platform.OS === 'android') {
      refInput.saveImage();
    } else if (Platform.OS === 'ios') {
      refInputIOS.current.readSignature();
    }
    // else {
    //   updateFieldsValue({rank: rank, value: signature});
    // }
    setSignaturesSaved(true);
  };

  const _onSaveEvent = (result) => {
    if (Platform.OS === 'android') {
      updateFieldsValue({rank: rank, value: result.encoded});
    } else {
      const base64Img = result.replace('data:image/png;base64,', '');
      updateFieldsValue({rank: rank, value: base64Img});
    }
  };

  const onBeginSign = () => {
    props.updateScrollEnabled(false);
  };

  const onEndSign = () => {
    props.updateScrollEnabled(true);
  };

  const _onDragEvent = (data) => {
    // console.log(data);
  };

  const iosStyle = `
    .m-signature-pad {
      position: absolute;
      border: none;
      box-shadow: none;
    }

    .m-signature-pad--body {
      border: none;
    }

    .m-signature-pad--body canvas {
      border: 1.5px dashed #bfbfbf;
      box-shadow: none;
    }
  `;

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
              {!isEditable && signatureSaved && (
                <View style={styles.dimmedSingature} />
              )}
            </View>
          ) : (
            <View style={styles.signature}>
              <SignatureScreen
                ref={refInputIOS}
                dataURL={iosSig}
                onBegin={onBeginSign}
                onEnd={onEndSign}
                backgroundColor="#ffffff"
                onOK={_onSaveEvent}
                webStyle={iosStyle}
              />
              {!isEditable && signatureSaved && (
                <View style={styles.dimmedSingature} />
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.leftButton}>
              <Button
                disabled={!isEditable}
                mode="contained"
                style={styles.buttonColor}
                onPress={signaturePadClear}>
                <Text style={styles.text}>Clear Signature</Text>
              </Button>
            </View>
            <View style={styles.rightButton}>
              <Button
                disabled={!isEditable}
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
