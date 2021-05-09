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
import {ListItem, Icon} from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button as RNButton} from 'react-native-paper';
import {connect} from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {find, propEq} from 'ramda';

import {createStructuredSelector} from 'reselect';
import {
  selectOfflineLinkedItems,
  selectOfflineCurrentForm,
} from '@selector/form';
import {goToOfflineFormFieldsScreen} from '@store/navigate';
import {screens} from '@constant/ScreenConstants';
import styles from './styles';
import ItemWrapper from '@components/Fields/ItemWrapper';
import R from 'ramda';
import {commonStyles} from '@styles/common';

class OfflineLinkedItemsList extends React.Component {
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

  keyExtractor = (item, index) => index?.toString();

  renderItem = ({item}) => {
    const {name, id} = item;
    return (
      <ListItem key={id} bottomDivider onPress={() => this.onPress(id)}>
        <MIcon name="file-text-o" type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  onSelectedItemsChange = (id) => {
    const {goToOfflineFormFieldsScreen} = this.props;
    goToOfflineFormFieldsScreen({
      linkedItemId: id,
      componentId: screens.OfflineLinkedItems,
    });
  };

  onSuccess = (e) => {
    const {linkedItems = [], goToOfflineFormFieldsScreen} = this.props;
    const serial = e.data;
    this.setState({showModal: false});

    const found = find(propEq('serialnumber', serial))(linkedItems);

    if (!found || found === null || found === '') {
      this.showNoItemToastAlert();
      return;
    }

    goToOfflineFormFieldsScreen({
      linkedItemId: found.id,
      componentId: screens.OfflineLinkedItems,
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
    const {container, selectToggle, button, itemText} = styles;

    return this.state.selOptions.length > 0 ? (
      <ItemWrapper>
        <View style={styles.topContainer}>
          <Text
            style={[
              commonStyles.text,
              commonStyles.spacing,
            ]}>{`Please select the item you are completing "${name}" for:`}</Text>
          <View>
            <SectionedMultiSelect
              styles={{
                container,
                selectToggle,
                button,
                itemText,
              }}
              items={this.state.selOptions}
              IconRenderer={MIcon}
              showCancelButton
              uniqueKey="id"
              single={true}
              selectText="Select from options"
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.options}
            />
          </View>

          {linkedtable.toLowerCase() === 'tools.tools' ? (
            <View style={styles.qrButton}>
              <RNButton
                mode="contained"
                onPress={() => this.setState({showModal: true})}>
                <Text style={commonStyles.text}>Scan serial number</Text>
              </RNButton>
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
      </ItemWrapper>
    ) : (
      <View>
        <Text> Error: please contact support</Text>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  linkedItems: selectOfflineLinkedItems,
  currentForm: selectOfflineCurrentForm,
});

export default connect(mapState, {goToOfflineFormFieldsScreen})(
  OfflineLinkedItemsList,
);
