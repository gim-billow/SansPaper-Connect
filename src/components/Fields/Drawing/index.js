import React from 'react';
import {View, Text, Platform} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import RNFetchBlob from 'rn-fetch-blob';
import {Divider} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import ItemWrapper from '../ItemWrapper';
import Stroke from './Stroke';
import {selectOrganistation} from '@selector/sanspaper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import styles from './styles';
import {syncImageInUpvise} from './helper';

const dirs = RNFetchBlob.fs.dirs;
class DrawingBoard extends React.Component {
  state = {
    changeTheme: false,
    imageDownloaded: false,
    base64: '',
    fileStat: {},
    path:
      dirs.DocumentDir +
      '/new_image_' +
      Math.round(new Date().getTime() / 1000) +
      '.jpg',
    signatureSaved: false,
    color: '#000000',
    colorBtns: [
      {color: '#000000', active: true},
      {color: '#FF0000', active: false},
      {color: '#57fdfe', active: false},
      {color: '#2333ff', active: false},
      {color: '#121ba1', active: false},
      {color: '#add9e6', active: false},
      {color: '#801b7f', active: false},
      {color: '#fdfb00', active: false},
      {color: '#51f900', active: false},
      {color: '#f63fff', active: false},
      {color: '#ffffff', active: false},
      {color: '#c0c0c0', active: false},
      {color: '#808080', active: false},
      {color: '#f8a501', active: false},
      {color: '#a5292a', active: false},
      {color: '#810c00', active: false},
      {color: '#237f01', active: false},
      {color: '#808000', active: false},
    ],
  };

  componentDidMount() {
    const {value} = this.props.item;

    const imageUrl = `https://www.upvise.com/uws/downloadfile/?id=${
      value ? value : '6A4A9F42DDFBDE79D92681F6BCD54B'
    }&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB`;

    RNFetchBlob.fetch('GET', imageUrl).then((res) => {
      RNFetchBlob.fs.writeFile(this.state.path, res.data, 'base64').then(() => {
        this.setState({imageDownloaded: true});
      });
    });
  }

  onClear = () => {
    this.setState({changeTheme: false, signatureSaved: false});
    this.canvas.clear();
  };

  onSave = async () => {
    const {item, updateFieldsValue, organization} = this.props;
    const {fileStat, base64} = this.state;

    const response = await syncImageInUpvise({
      imgId: item.value,
      base64,
      fileStat,
      fieldId: item.id,
      token: organization.upviseToken,
    });

    if (response.status === 200) {
      this.setState({changeTheme: true, signatureSaved: true});
      updateFieldsValue({rank: item.rank, value: response.valueImgId});

      await RNFetchBlob.fs.unlink(this.state.path);
    }
  };

  saveBase64Img = () => {
    this.canvas.getBase64('jpg', false, true, false, false, (err, result) => {
      if (err) {
        return console.log('error', err);
      }

      result = result.toString().replace(/[\r\n]/g, '');

      RNFetchBlob.fs
        .writeFile(this.state.path, result, 'base64')
        .then(() => {
          return RNFetchBlob.fs.stat(this.state.path);
        })
        .then((stat) => {
          this.setState({
            base64: result,
            fileStat: stat,
          });
        });
    });
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
            <View style={styles.button}>
              <View style={{paddingRight: 10}}>
                <Button
                  mode="contained"
                  style={styles.buttonColor}
                  onPress={() => {
                    this.onClear();
                  }}>
                  <Text style={styles.text}>Clear</Text>
                </Button>
              </View>
              <View>
                <Button
                  mode="contained"
                  style={
                    changeTheme === true
                      ? styles.ChangeButtonColor
                      : styles.buttonColor
                  }
                  onPress={() => {
                    this.onSave();
                  }}>
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
            </View>
            <SketchCanvas
              style={styles.sketch}
              strokeColor={this.state.color}
              strokeWidth={5}
              onStrokeStart={() => this.handleOnStrokeStart(false)}
              localSourceImage={{
                filename: this.state.path,
                mode: 'ScaleToFill',
              }}
              ref={(ref) => (this.canvas = ref)}
              onStrokeEnd={() => {
                this.handleOnStrokeStart(true);
                this.saveBase64Img();
              }}
            />
            <View style={styles.canvasContainer}>
              <View style={styles.canvasWrapper}>
                <Stroke
                  colors={this.state.colorBtns}
                  setActiveColor={(selected) => {
                    this.setState((prevState) => {
                      const colors = prevState.colorBtns.map((color) => ({
                        ...color,
                        active: false,
                      }));
                      colors[selected].active = true;

                      return {colorBtns: colors};
                    });
                  }}
                  changeColor={(color) => this.setState({color})}
                />
              </View>
            </View>
          </View>
          {this.state.signatureSaved && <View style={styles.dimmedSingature} />}
        </View>
        <Divider />
      </ItemWrapper>
    );
  }
}

const mapState = createStructuredSelector({
  organization: selectOrganistation,
});

export default connect(mapState, null)(DrawingBoard);
