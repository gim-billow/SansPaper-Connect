import React from 'react';
import {View, Text, Platform} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import RNFetchBlob from 'rn-fetch-blob';
import {Divider} from 'react-native-elements';
import {Button} from 'react-native-paper';

import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import styles from './styles';

const dirs = RNFetchBlob.fs.dirs;
const deleteImage = RNFetchBlob.fs.unlink;
class DrawingBoard extends React.Component {
  state = {
    changeTheme: false,
    imageDownloaded: false,
    base64: '',
    path:
      dirs.DocumentDir +
      '/new_image_' +
      Math.round(new Date().getTime() / 1000) +
      '.jpg',
    signatureSaved: false,
  };

  componentDidMount() {
    const {value} = this.props.item;

    const imageUrl = `https://www.upvise.com/uws/downloadfile/?id=${
      // value ? value : '6A4A9F42DDFBDE79D92681F6BCD54B'
      !value ? value : '0E3A1C785BB0652CAAC8E3121023DB'
    }&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB`;

    RNFetchBlob.fetch('GET', imageUrl).then((res) => {
      RNFetchBlob.fs.writeFile(this.state.path, res.data, 'base64').then(() => {
        this.setState({imageDownloaded: true});
      });
    });
  }

  onClear = () => {
    const {item, updateFieldsValue} = this.props;
    this.setState({changeTheme: false, signatureSaved: false});
    updateFieldsValue({rank: item.rank, value: ''});
    this.canvas.clear();
  };

  onSave = (success, path) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({changeTheme: true, signatureSaved: true});

    RNFetchBlob.fs
      .readFile(path, 'base64')
      .then((base64String) => {
        updateFieldsValue({
          rank: item.rank,
          value: base64String,
        });
      })
      .then(() => {
        return deleteImage(path);
      })
      .finally(() => {
        console.log('Image deleted');
      });

    // ImgToBase64.getBase64String('file://' + path)
    //   .then((base64String) => {
    //     updateFieldsValue({rank: item.rank, value: base64String});
    //   })
    //   .catch((err) => console.log(err));

    // deleteImage(path)
    //   .then(() => console.log('Image deleted'))
    //   .catch((err) => console.log(err));
  };

  handleOnStrokeStart = (status) => {
    const {updateScrollEnabled} = this.props;
    if (Platform.OS === 'ios') {
      updateScrollEnabled(status);
    }
  };

  render() {
    const {label, mandatory} = this.props.item;
    const {changeTheme} = this.state;

    if (!this.state.imageDownloaded) {
      return <View />;
    }
    return (
      <ItemWrapper>
        <View style={styles.topContainer}>
          <Text style={commonStyles.text}>{label}</Text>
          {mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View style={styles.box}>
            <RNSketchCanvas
              localSourceImage={{
                filename: this.state.path,
                mode: 'ScaleToFill',
              }}
              onStrokeStart={() => this.handleOnStrokeStart(false)}
              onStrokeEnd={() => this.handleOnStrokeStart(true)}
              containerStyle={styles.containerStyle}
              canvasStyle={styles.canvasStyle}
              style={styles.sketch}
              strokeComponent={(color) => (
                <View
                  style={[{backgroundColor: color}, styles.strokeColorButton]}
                />
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <View
                    style={[
                      {backgroundColor: color, borderWidth: 2},
                      styles.strokeWidthButton,
                    ]}
                  />
                );
              }}
              strokeWidth={10}
              ref={(ref) => (this.canvas = ref)}
              clearComponent={
                <View style={styles.button}>
                  <Button
                    mode="contained"
                    style={styles.buttonColor}
                    onPress={() => {
                      this.onClear();
                    }}>
                    <Text style={styles.text}>Clear</Text>
                  </Button>
                </View>
              }
              saveComponent={
                <View style={styles.button}>
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
                          : styles.text
                      }>
                      {changeTheme === true ? 'Saved' : 'Save'}
                    </Text>
                  </Button>
                </View>
              }
              savePreference={() => {
                return {
                  folder: 'RNSketchCanvas',
                  filename: String(Math.ceil(Math.random() * 100000000)),
                  transparent: true,
                  imageType: 'jpg',
                  includeImage: true,
                  includeText: false,
                };
              }}
              onSketchSaved={(success, path) => this.onSave(success, path)}
              onClearPressed={() => this.onClear()}
            />
          </View>
          {this.state.signatureSaved && <View style={styles.dimmedSingature} />}
        </View>
        <Divider />
      </ItemWrapper>
    );
  }
}

export default DrawingBoard;
