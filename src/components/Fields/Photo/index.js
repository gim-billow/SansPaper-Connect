import React, {useState} from 'react';
import {Alert, Modal, Text, View} from 'react-native';
import {Thumbnail} from 'native-base';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple} from 'react-native-paper';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import ImagePicker from 'react-native-image-crop-picker';

const Photo = (props) => {
  const {label, rank} = props.item;
  const {updateFieldsValue} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState('');
  const [title, setTitle] = useState('Add a ' + label);

  function takePicture(fromCamera) {
    if (fromCamera) {
      setModalVisible(!modalVisible);
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 400,
        compressImageQuality: 0.75,
        includeBase64: true,
      }).then((image) => {
        setThumbnailImage(image.path);
        updateFieldsValue({rank: rank, value: image});
        setChangeTheme(true);
        setTitle('Retake ' + label);
      });
    } else {
      setModalVisible(!modalVisible);
      ImagePicker.clean()
        .then(() => {
          ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality: 0.75,
            includeBase64: true,
          }).then((images) => {
            setThumbnailImage(images[0].path);
            updateFieldsValue({rank: rank, value: images});
            setChangeTheme(true);
            setTitle('Retake ' + label);
          });
        })
        .catch((e) => {
          console.log('camera-request error', e);
        });
    }
  }

  const cancel = () => {
    setChangeTheme(false);
    setThumbnailImage('');
    setTitle('Add a ' + label);
    updateFieldsValue({rank: rank, value: ''});
    Toast.show('Successfully, remove the ' + label);
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
      {thumbnailImage === '' ? null : (
        <View style={styles.Thumbnail}>
          <Thumbnail
            square
            style={styles.thumbnailStyle}
            source={{uri: thumbnailImage}}
          />
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
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sans Paper</Text>

              <View style={styles.buttonMargin}>
                <Button
                  mode="contained"
                  onPress={() => {
                    takePicture(true);
                  }}>
                  <Text>FROM CAMERA</Text>
                </Button>
              </View>
              <View style={styles.buttonMargin}>
                <Button
                  mode="contained"
                  onPress={() => {
                    takePicture(false);
                  }}>
                  <Text>FROM GALLERY</Text>
                </Button>
              </View>
              <View style={styles.buttonMargin}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text>CANCEL</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ItemWrapper>
  );
};

export default Photo;
