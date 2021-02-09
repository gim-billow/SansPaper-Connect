import React, {useState} from 'react';
import {Alert, Modal, Text, View, Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple, IconButton, Colors} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';

const QrScanner = (props) => {
  const {label, rank} = props.item;
  const {updateFieldsValue} = props;
  const [changeTheme, setChangeTheme] = useState(false);
  const [title, setTitle] = useState('QR Scan');
  const [modalVisible, setModalVisible] = useState(false);
  const [QrDetails, setQrDetails] = useState('');

  const cancel = () => {
    if (QrDetails !== '') {
      setChangeTheme(false);
      setTitle('QR Scan');
      setQrDetails('');
      updateFieldsValue({rank: rank, value: ''});
      Toast.show('Successfully, remove the QR Code');
    }
  };

  const onSuccess = (e) => {
    console.log('scan', e);

    setQrDetails(e.data);
    setChangeTheme(true);
    setModalVisible(false);
    setTitle('retake qr scan');
    updateFieldsValue({rank: rank, value: e.data});
    Linking.openURL(e.data).catch((err) =>
      console.error('An error occured', err),
    );
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
      {QrDetails === '' ? null : (
        <View style={styles.QrResult}>
          <QRCode value={QrDetails} />
          <Text>{QrDetails}</Text>
        </View>
      )}
      <View style={styles.button}>
        <TouchableRipple
          onLongPress={cancel}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Button
            mode="contained"
            style={
              changeTheme === true
                ? styles.ChangeButtonColor
                : styles.buttonColor
            }>
            <Text
              style={
                changeTheme === true ? styles.ChangeTextColor : styles.TextColor
              }>
              {title.toString()}
            </Text>
          </Button>
        </TouchableRipple>
      </View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.qrArea}>
            <QRCodeScanner
              onRead={onSuccess}
              showMarker
              topContent={
                <View style={styles.h}>
                  <View style={styles.header}>
                    <IconButton
                      style={styles.icon}
                      icon="arrow-left"
                      color={Colors.white}
                      size={23}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    />
                    <Text style={styles.modalText}>QR Scanner</Text>
                  </View>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </ItemWrapper>
  );
};

export default QrScanner;
