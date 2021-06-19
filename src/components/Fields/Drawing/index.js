import React from 'react';
import {View, Text, Platform, Image as RNImage} from 'react-native';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import RNFetchBlob from 'rn-fetch-blob';
import {Button} from 'react-native-elements';
// import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

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
    draftImage: '',
    fileStat: {},
    path:
      dirs.DocumentDir +
      '/new_image_' +
      Math.round(new Date().getTime() / 1000) +
      '.jpg',
    signatureSaved: false,
    saving: false,
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
    const {item, draftId} = this.props;
    const {value} = item;
    let imageUrl = '';
    let imageValue = '';

    if (value && typeof value === 'object') {
      imageValue = value.oldValue;
    } else {
      imageValue = value;
    }

    imageUrl = `https://www.upvise.com/uws/downloadfile/?id=${
      imageValue ? imageValue : '6A4A9F42DDFBDE79D92681F6BCD54B'
    }&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB`;

    // this is only to display the saved value for the draft
    if (draftId && value) {
      let draftImg = '';
      if (value && typeof value === 'object') {
        draftImg = value.newValue;
      } else {
        draftImg = value;
      }
      const draftImage = `https://www.upvise.com/uws/downloadfile/?id=${
        draftImg ? draftImg : '6A4A9F42DDFBDE79D92681F6BCD54B'
      }&auth=iqb4EdxZxm8%2BwWBg50ImWk4sta3MT4IB`;

      RNFetchBlob.fetch('GET', draftImage).then((res) => {
        this.setState({
          imageDownloaded: true,
          draftImage: `data:image/jpeg;base64,${res.data}`,
          changeTheme: true,
          signatureSaved: true,
        });
      });
    }

    RNFetchBlob.fetch('GET', imageUrl).then((res) => {
      RNFetchBlob.fs.writeFile(this.state.path, res.data, 'base64').then(() => {
        this.setState({imageDownloaded: true});
      });
    });
  }

  onClear = async () => {
    const {item, updateFieldsValue} = this.props;
    const {value} = item;

    updateFieldsValue({
      rank: item.rank,
      value: typeof value === 'object' ? value.oldValue : value,
    });
    this.setState({changeTheme: false, signatureSaved: false, draftImage: ''});
    this.canvas.clear();
  };

  onSave = async () => {
    this.setState({saving: true});
    const {item, updateFieldsValue, organization} = this.props;
    const {value, id, rank} = item;
    const {fileStat, base64} = this.state;

    const response = await syncImageInUpvise({
      imgId: typeof value === 'object' ? value.newValue : value,
      base64,
      fileStat,
      fieldId: id,
      token: organization.upviseToken,
    });

    if (response.status === 200) {
      this.setState({changeTheme: true, signatureSaved: true, saving: false});
      updateFieldsValue({
        rank: rank,
        value: {
          oldValue: typeof value === 'object' ? value.oldValue : value,
          newValue: response.valueImgId,
        },
      });

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
        .appendFile(this.state.path, result, 'base64')
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
    const {isEditable} = this.props;
    const {label, mandatory} = this.props.item;
    const {changeTheme, saving, signatureSaved, draftImage} = this.state;

    if (!this.state.imageDownloaded) {
      return <View />;
    }
    return (
      <>
        <View style={styles.topContainer}>
          <Text style={commonStyles.title}>{label}</Text>
          {mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View style={styles.box}>
            <View style={styles.button}>
              <View style={{paddingRight: 10}}>
                <Button
                  disabled={!isEditable}
                  disabledTitleStyle={styles.disableText}
                  disabledStyle={styles.disable}
                  type="outline"
                  style={styles.buttonColor}
                  title="Clear"
                  titleStyle={styles.title}
                  buttonStyle={styles.btnContainer}
                  onPress={this.onClear}
                />
              </View>
              <View>
                <Button
                  disabled={!isEditable || changeTheme}
                  disabledTitleStyle={styles.disableText}
                  disabledStyle={styles.disable}
                  type={changeTheme ? 'solid' : 'outline'}
                  style={styles.buttonColor}
                  title={changeTheme ? 'Saved' : saving ? 'Saving...' : 'Save'}
                  titleStyle={styles.title}
                  buttonStyle={styles.btnContainer}
                  onPress={this.onSave}
                />
              </View>
            </View>
            <View style={{flex: 1}}>
              {draftImage ? (
                <RNImage
                  source={{uri: draftImage}}
                  resizeMode="center"
                  resizeMethod="scale"
                  style={styles.image}
                />
              ) : (
                <SketchCanvas
                  style={styles.sketch}
                  strokeColor={this.state.color}
                  strokeWidth={5}
                  onStrokeStart={() => this.handleOnStrokeStart(false)}
                  localSourceImage={{
                    filename: this.state.path,
                  }}
                  ref={(ref) => (this.canvas = ref)}
                  onStrokeEnd={() => {
                    this.handleOnStrokeStart(true);
                    this.saveBase64Img();
                  }}
                  touchEnabled={isEditable && !signatureSaved && !saving}
                />
              )}
            </View>
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
        </View>
      </>
    );
  }
}

const mapState = createStructuredSelector({
  organization: selectOrganistation,
});

export default connect(mapState, null)(DrawingBoard);
