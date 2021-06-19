/* eslint-disable react-hooks/exhaustive-deps */
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
import {Icon, Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';

import styles from './styles';
import {commonStyles} from '@styles/common';
import MandatoryField from '../MandatoryField';

const QrScanner = (props) => {
  const {label, rank, mandatory, value} = props.item;
  const {updateFieldsValue, isEditable} = props;
  const [changeTheme, setChangeTheme] = useState(false);
  const [title, setTitle] = useState('QR Scan');
  const [modalVisible, setModalVisible] = useState(false);
  const [QrDetails, setQrDetails] = useState('');

  useEffect(() => {
    if (value) {
      setQrDetails(value);
      setChangeTheme(true);
      setTitle('Rescan QR');
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
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{label}</Text>
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
            disabled={!isEditable}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={title}
            type={changeTheme ? 'solid' : 'outline'}
            titleStyle={styles.title}
            buttonStyle={styles.container}
            onPress={() => setModalVisible(true)}
            onLongPress={cancel}
          />
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
    </>
  );
};

export default QrScanner;
