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
      console.log('res.data', res.data);
      RNFetchBlob.fs
        .writeFile(this.state.path, res.data, 'base64')
        .then((res) => {
          this.setState({imageDownloaded: true});
        });
    });
  }
  render() {
    const {label} = this.props.item;
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
            strokeColor={'red'}
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
            onClearPressed={() => {
              this.canvas.clear();
            }}
            saveComponent={
              <View style={styles.button}>
                <Button mode="contained" style={styles.buttonColor}>
                  <Text style={styles.text}>Save</Text>
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
            onSketchSaved={(success, path) => {
              const {item, updateFieldsValue} = this.props;
              updateFieldsValue({rank: item.rank, value: path});

              Alert.alert(
                success ? 'Image saved!' : 'Failed to save image!',
                path,
              );
            }}
          />
        </View>
      </ItemWrapper>
    );
  }
}

export default DrawingBoard;
