//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity, Platform} from 'react-native';
import {Icon, Card} from 'react-native-elements';
import {findIndex, propEq} from 'ramda';

import Skeleton from '@components/Skeleton';
import {selectOfflineFormList} from '@selector/form/index';
import {selectBetaAccess, selectOfflineFeature} from '@selector/user';
import {
  updateCurrentFormId,
  updateFormList,
  syncOfflineForm,
} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';

import styles from './styles';
import {green, darkGrey} from '@styles/colors';
import {cardStyle} from '@styles/common';

class FormList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  onPress = (linked_table, form_id) => {
    const {
      goToLinkedItemScreen,
      updateCurrentFormId,
      goToFormFieldsScreen,
      syncOfflineForm,
    } = this.props;

    updateCurrentFormId(form_id);
    //syncOfflineForm({linkedTable: linked_table});
    if (linked_table && linked_table !== '') {
      goToLinkedItemScreen({linkedTable: linked_table});
    } else {
      goToFormFieldsScreen({componentId: screens.FormScreen});
    }
  };

  downloadForm = (linked_table, form_id) => {
    this.props.syncOfflineForm({
      linkedTable: linked_table,
      formId: form_id,
    });
  };

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;
    const {offlineForms, offlineFeature, betaAccess} = this.props;

    const index = findIndex(propEq('name', name))(offlineForms);

    return (
      <View style={{paddingVertical: 4}}>
        <Card containerStyle={cardStyle.shadow}>
          <View style={styles.cardView}>
            <TouchableOpacity
              style={styles.titleView}
              key={id}
              onPress={() => this.onPress(linkedtable, id)}>
              <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {Platform.OS === 'android' ? (
                <Icon
                  type="antdesign"
                  name="filetext1"
                  color={darkGrey}
                  size={16}
                />
              ) : (
                <Icon
                  type="ionicon"
                  name="document-text-outline"
                  color={darkGrey}
                  size={20}
                />
              )}
              {!offlineFeature && !betaAccess ? null : index === -1 ? (
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => this.downloadForm(linkedtable, id)}>
                  {Platform.OS === 'android' ? (
                    <Icon
                      type="antdesign"
                      name="download"
                      color={darkGrey}
                      size={16}
                    />
                  ) : (
                    <Icon
                      type="ionicon"
                      name="download-outline"
                      color={darkGrey}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled
                  style={styles.downloadButton}
                  onPress={() => {}}>
                  {Platform.OS === 'android' ? (
                    <Icon
                      type="antdesign"
                      name="checkcircle"
                      color={green}
                      size={16}
                    />
                  ) : (
                    <Icon
                      type="ionicon"
                      name="checkmark-circle"
                      color={green}
                      size={20}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {
      offlineForms,
      filteredFromList,
      searchKeyword,
      offlineFeature,
      betaAccess,
    } = this.props;

    return (
      <View style={styles.container}>
        {filteredFromList && filteredFromList.length > 0 ? (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={filteredFromList}
            renderItem={this.renderItem}
            extraData={[offlineForms, offlineFeature, betaAccess]}
          />
        ) : searchKeyword === '' ? (
          <View style={styles.loaderContainer}>
            <Skeleton />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No results match your search criteria.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  offlineFeature: selectOfflineFeature,
  betaAccess: selectBetaAccess,
  offlineForms: selectOfflineFormList,
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
  updateFormList,
  syncOfflineForm,
})(FormList);
