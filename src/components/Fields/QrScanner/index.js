import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-paper';
import {Divider, Icon} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import {commonStyles} from '../../../styles/common';
import MandatoryField from '../MandatoryField';

const QrScanner = (props) => {
  const {label, rank, mandatory, value} = props.item;
  const {updateFieldsValue} = props;
  const [changeTheme, setChangeTheme] = useState(false);
  const [title, setTitle] = useState('QR Scan');
  const [modalVisible, setModalVisible] = useState(false);
  const [QrDetails, setQrDetails] = useState('');

  useEffect(() => {
    if (value) {
      setQrDetails(value);
      setChangeTheme(true);
      setTitle('retake qr scan');
    }
  }, []);

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
    setQrDetails(e.data);
    setChangeTheme(true);
    setModalVisible(false);
    setTitle('retake qr scan');
    updateFieldsValue({rank: rank, value: e.data});
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
        {QrDetails === '' ? null : (
          <View style={styles.QrResult}>
            <QRCode value={QrDetails} />
            <Text style={[commonStyles.text, styles.qrResultText]}>
              {QrDetails}
            </Text>
          </View>
        )}
        <View style={styles.button}>
          <Button
            onLongPress={cancel}
            onPress={() => {
              setModalVisible(true);
            }}
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
                markerStyle={styles.qrBorderColor}
                topContent={
                  <SafeAreaView style={styles.h}>
                    <View style={styles.header}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.qrBackBtn}>
                          <Icon
                            containerStyle={styles.icon}
                            name="chevron-left"
                            type="font-awesome"
                            color="#fff"
                            onPress={() => {}}
                          />
                          <Text style={styles.modalText}>Back</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                }
              />
            </View>
          </View>
        </Modal>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default QrScanner;
