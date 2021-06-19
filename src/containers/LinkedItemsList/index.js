import React from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Icon, Button as RNEButton} from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import QRCodeScanner from 'react-native-qrcode-scanner';
import R from 'ramda';

import {createStructuredSelector} from 'reselect';
import {selectCurrentLinkedItems, selectCurrentForm} from '@selector/form';
import {goToFormFieldsScreen} from '@store/navigate';
import {screens} from '@constant/ScreenConstants';
import styles from './styles';

class LinkedItemsList extends React.Component {
  state = {
    options: [],
    selOptions: [],
    showModal: false,
  };

  async componentDidMount() {
    const {linkedItems = []} = this.props;

    const filteredOptions = R.pipe(
      R.sortBy(R.compose(R.toLower, R.prop('name'))),
      R.filter((option) => !R.isNil(option)),
    )(linkedItems);

    this.updateSelOptions(filteredOptions);
  }

  updateSelOptions = (options) => {
    this.setState({selOptions: options});
  };

  onSelectedItemsChange = (id) => {
    const {goToFormFieldsScreen} = this.props;
    goToFormFieldsScreen({linkedItemId: id, componentId: screens.LinkedItems});
  };

  onSuccess = (e) => {
    const {linkedItems = [], goToFormFieldsScreen} = this.props;
    const serial = e.data;
    this.setState({showModal: false});

    const found = R.find(R.propEq('serialnumber', serial))(linkedItems);

    if (!found || found === null || found === '') {
      this.showNoItemToastAlert();
      return;
    }

    goToFormFieldsScreen({
      linkedItemId: found.id,
      componentId: screens.LinkedItems,
    });
  };

  showNoItemToastAlert = () => {
    if (Platform.OS === 'android') {
      Toast.show('Item not found in this list', Toast.LONG);
      return;
    }

    setTimeout(() => {
      Toast.showWithGravity(
        'Item not found in this list',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }, 200);
  };

  render() {
    const {name, linkedtable} = this.props.currentForm;
    const {
      container,
      selectToggle,
      button,
      itemText,
      selectToggleText,
      searchBar,
      confirmText,
    } = styles;

    return this.state.selOptions.length > 0 ? (
      <View style={styles.topContainer}>
        <View style={styles.subjectHeader}>
          <Text
            style={
              styles.headerText
            }>{`Please select the item you are completing "${name}" for:`}</Text>
        </View>
        <View style={styles.selectView}>
          <SectionedMultiSelect
            styles={{
              confirmText,
              container,
              searchBar,
              selectToggle,
              button,
              itemText,
              selectToggleText,
            }}
            items={this.state.selOptions}
            IconRenderer={MIcon}
            showCancelButton
            uniqueKey="id"
            single={true}
            selectText="Select subject"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.options}
          />
        </View>

        {linkedtable?.toLowerCase() === 'tools.tools' ? (
          <View style={styles.qrView}>
            <RNEButton
              onPress={() => this.setState({showModal: true})}
              icon={
                Platform.OS === 'android' ? (
                  <Icon
                    type="antdesign"
                    size={20}
                    name="qrcode"
                    color="white"
                  />
                ) : (
                  <Icon
                    type="ionicon"
                    size={20}
                    name="qr-code-outline"
                    color="white"
                  />
                )
              }
              title="Scan serial number"
              buttonStyle={styles.qrButton}
              titleStyle={styles.qrText}
            />
          </View>
        ) : null}

        <Modal
          animationType="fade"
          visible={this.state.showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.qrArea}>
              <QRCodeScanner
                onRead={this.onSuccess}
                showMarker
                markerStyle={styles.qrBorderColor}
                topContent={
                  <SafeAreaView style={styles.h}>
                    <View style={styles.header}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            showModal: !this.state.showModal,
                          })
                        }>
                        <View style={styles.qrBackBtn}>
                          <Icon
                            containerStyle={styles.icon}
                            name="chevron-left"
                            type="font-awesome"
                            color="#fff"
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
    ) : (
      <View style={styles.topContainer}>
        <View style={styles.subjectHeader}>
          <Text style={styles.headerText}>
            Linked items are empty. Please contact support.
          </Text>
        </View>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  linkedItems: selectCurrentLinkedItems,
  currentForm: selectCurrentForm,
});

export default connect(mapState, {goToFormFieldsScreen})(LinkedItemsList);
