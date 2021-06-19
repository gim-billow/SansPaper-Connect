import React, {useState, useEffect, memo} from 'react';
import {View, Platform} from 'react-native';
import {Thumbnail} from 'native-base';
import Toast from 'react-native-simple-toast';
import {Overlay, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import {commonStyles} from '@styles/common';
import MandatoryField from '../MandatoryField';

const imgWidth = Platform.OS === 'android' ? 500 : 300;
const imgHeight = Platform.OS === 'android' ? 600 : 400;
const imgQuality = Platform.OS === 'android' ? 0.9 : 0.75;

const Photo = (props) => {
  const {label, rank, mandatory} = props.item;
  const {updateFieldsValue, isEditable} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState('');
  const [title, setTitle] = useState('Add a photo');

  useEffect(() => {
    const {value} = props.item;

    if (value && value[0].path) {
      setThumbnailImage(value[0].path);
      setChangeTheme(true);
      setTitle('Retake photo');
    }
  }, [props.item]);

  function takePicture(fromCamera) {
    if (fromCamera) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        compressImageMaxWidth: imgWidth,
        compressImageMaxHeight: imgHeight,
        compressImageQuality: imgQuality,
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
        setTitle('Retake photo');
      });
    } else {
      ImagePicker.clean()
        .then(() => {
          ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 400,
            compressImageMaxWidth: imgWidth,
            compressImageMaxHeight: imgHeight,
            compressImageQuality: imgQuality,
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
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{label}</Text>
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
          <Button
            disabled={!isEditable}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={title}
            type={changeTheme ? 'solid' : 'outline'}
            titleStyle={styles.title}
            buttonStyle={styles.btnContainer}
            onPress={() => setModalVisible(true)}
            onLongPress={cancel}
          />
        </View>

        <Overlay
          animationType="fade"
          overlayStyle={styles.overlay}
          backdropStyle={styles.backdrop}
          isVisible={modalVisible}>
          <View style={styles.overlayHeader}>
            <View style={styles.overlayHeaderText}>
              <Text style={styles.photoText}>Add Photo</Text>
              <Text style={styles.subPhotoText}>in this selected field</Text>
            </View>
            <Button
              title="From camera"
              onPress={() => takePicture(true)}
              titleStyle={styles.overlayText}
              icon={
                <Icon
                  name="camera"
                  size={16}
                  color="white"
                  style={styles.iconSpace}
                />
              }
              buttonStyle={styles.overlayBtn}
            />
            <Button
              title="From gallery"
              onPress={() => takePicture(false)}
              titleStyle={styles.overlayText}
              icon={
                <Icon
                  name="image"
                  size={17}
                  color="white"
                  style={styles.iconSpace}
                />
              }
              buttonStyle={styles.overlayBtn}
            />
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
              buttonStyle={styles.closeBtnOverlay}
              type="outline"
              titleStyle={styles.closeTxtOverlay}
              containerStyle={styles.closeContainer}
            />
          </View>
        </Overlay>
      </View>
    </>
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
