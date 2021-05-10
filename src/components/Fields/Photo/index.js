import React, {useState, memo} from 'react';
import {Text, View, Platform} from 'react-native';
import {Thumbnail} from 'native-base';
import Toast from 'react-native-simple-toast';
import {Button, TouchableRipple} from 'react-native-paper';
import {
  Divider,
  Overlay,
  Button as RNEButton,
  Text as RNEText,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import {commonStyles} from '@styles/common';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';

const Photo = (props) => {
  const {label, rank, mandatory} = props.item;
  const {updateFieldsValue} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState('');
  const [title, setTitle] = useState('Add a Photo');

  function takePicture(fromCamera) {
    if (fromCamera) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        // compressImageMaxWidth: 300,
        // compressImageMaxHeight: 400,
        compressImageQuality: 0.75,
        includeBase64: true,
      }).then((image) => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            setModalVisible(!modalVisible);
          }, 100);
        } else {
          setModalVisible(!modalVisible);
        }
        setThumbnailImage(image.path);
        updateFieldsValue({rank: rank, value: [image]});
        setChangeTheme(true);
        setTitle('Retake Photo');
      });
    } else {
      ImagePicker.clean()
        .then(() => {
          ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            // compressImageMaxWidth: 300,
            // compressImageMaxHeight: 400,
            compressImageQuality: 0.75,
            includeBase64: true,
          }).then((images) => {
            if (Platform.OS === 'ios') {
              setTimeout(() => {
                setModalVisible(!modalVisible);
              }, 100);
            } else {
              setModalVisible(!modalVisible);
            }
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
      <View style={styles.topContainer}>
        <Text style={commonStyles.text}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        {thumbnailImage === '' ? (
          <View style={styles.noThumbNailSpace} />
        ) : (
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
                  changeTheme === true
                    ? styles.ChangeTextColor
                    : styles.TextColor
                }>
                {title.toString()}
              </Text>
            </Button>
          </TouchableRipple>
        </View>

        <Overlay
          animationType="fade"
          overlayStyle={styles.overlay}
          backdropStyle={styles.backdrop}
          isVisible={modalVisible}>
          <View style={styles.overlayHeader}>
            <View style={styles.overlayHeaderText}>
              <RNEText h4>Add Photo</RNEText>
              <Text>in this selected field</Text>
            </View>
            <RNEButton
              title="From Camera"
              onPress={() => takePicture(true)}
              icon={
                <Icon
                  name="camera"
                  size={18}
                  color="white"
                  style={styles.iconSpace}
                />
              }
              buttonStyle={styles.overlayBtn}
            />
            <RNEButton
              title="From Gallery"
              onPress={() => takePicture(false)}
              icon={
                <Icon
                  name="image"
                  size={18}
                  color="white"
                  style={styles.iconSpace}
                />
              }
              buttonStyle={styles.overlayBtn}
            />
            <RNEButton
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              buttonStyle={styles.closeBtnOverlay}
              type="outline"
              titleStyle={styles.closeTxtOverlay}
            />
          </View>
        </Overlay>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (
    (prevProps.item.value
      ? prevProps.item.value[0].path
      : prevProps.item.value) ===
    (nextProps.item.value ? nextProps.item.value[0].path : nextProps.item.value)
  ) {
    return true;
  }
  return false;
};

export default memo(Photo, areEqual);
