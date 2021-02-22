import React from 'react';
import {View, Text, Alert} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import RNFetchBlob from 'rn-fetch-blob';
import ItemWrapper from '../ItemWrapper';
import {Button} from 'react-native-paper';
import styles from './styles';

const dirs = RNFetchBlob.fs.dirs;

class DrawingBoard extends React.Component {
  state = {
    changeTheme: false,
    imageDownloaded: false,
    path:
      dirs.DocumentDir +
      '/new_image_' +
      Math.round(new Date().getTime() / 1000) +
      '.jpg',
  };

  componentWillMount() {
    let imageUrl =
      'https://www.upvise.com/uws/downloadfile/?id=6A4A9F42DDFBDE79D92681F6BCD54B&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB';

    RNFetchBlob.fetch('GET', imageUrl).then((res) => {
      RNFetchBlob.fs
        .writeFile(this.state.path, res.data, 'base64')
        .then((res) => {
          this.setState({imageDownloaded: true});
        });
    });
  }
  onClear = () => {
    const {item, updateFieldsValue} = this.props;
    this.setState({changeTheme: false});
    updateFieldsValue({rank: item.rank, value: ''});
    this.canvas.clear();
  };

  onSave = (success, path) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({changeTheme: true});
    updateFieldsValue({rank: item.rank, value: path});
  };
  render() {
    const {label} = this.props.item;
    const {changeTheme} = this.state;

    if (!this.state.imageDownloaded) {
      return <View />;
    }
    return (
      <ItemWrapper>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.box}>
          <RNSketchCanvas
            localSourceImage={{
              filename: this.state.path,
              mode: 'ScaleToFill',
            }}
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
                    styles.strokeColorButton,
                  ]}
                />
              );
            }}
            strokeWidth={5}
            ref={(ref) => (this.canvas = ref)}
            clearComponent={
              <View style={styles.button}>
                <Button
                  mode="contained"
                  style={styles.buttonColor}
                  onPress={() => {
                    this.canvas.clear();
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
              };
            }}
            onSketchSaved={(success, path) => this.onSave(success, path)}
            onClearPressed={() => this.onClear()}
          />
        </View>
      </ItemWrapper>
    );
  }
}

export default DrawingBoard;
