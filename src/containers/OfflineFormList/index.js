//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Icon, Card} from 'react-native-elements';

import {selectOfflineFeature, selectBetaAccess} from '@selector/user';
import {updateOfflineCurrentFormId, deleteOfflineForm} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {
  goToOfflineLinkedItemScreen,
  goToOfflineFormFieldsScreen,
} from '@store/navigate';

import styles from './styles';
import {red, lightGrey} from '@styles/colors';
import {cardStyle} from '@styles/common';
import {selectNetworkInfo} from '@selector/common';

class OfflineFormList extends React.Component {
  keyExtractor = (item, index) => index?.toString();

  onPress = (linked_table, form_id) => {
    const {
      goToOfflineLinkedItemScreen,
      updateOfflineCurrentFormId,
      goToOfflineFormFieldsScreen,
    } = this.props;

    updateOfflineCurrentFormId(form_id);
    if (linked_table && linked_table !== '') {
      goToOfflineLinkedItemScreen({linkedTable: linked_table});
    } else {
      goToOfflineFormFieldsScreen({
        formId: form_id,
        componentId: screens.FormScreen,
      });
    }
  };

  onDeleteAlert = (id) =>
    Alert.alert(
      '',
      'Are you sure you want to remove the downloaded form?',
      [
        {
          text: 'Delete',
          onPress: () => this.props.deleteOfflineForm(id),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;

    return (
      <View style={{paddingVertical: 4}}>
        <Card containerStyle={cardStyle.shadow}>
          <View style={styles.cardView}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.onDeleteAlert(id)}>
                {Platform.OS === 'android' ? (
                  <Icon type="antdesign" name="delete" color={red} size={16} />
                ) : (
                  <Icon
                    type="ionicon"
                    name="trash-outline"
                    color={red}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.titleView}
              onPress={() => this.onPress(linkedtable, id)}>
              <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Icon name="navigate-next" color={lightGrey} />
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {
      filteredFromList,
      searchKeyword,
      offlineFeature,
      betaAccess,
      networkInfo,
    } = this.props;

    if (!offlineFeature && !betaAccess) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Offline access feature is expired. To continue using the feature,
            contact the administrator.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.flex1}>
        {filteredFromList && filteredFromList.length > 0 ? (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={filteredFromList}
            renderItem={this.renderItem}
          />
        ) : networkInfo.isInternetReachable ? (
          searchKeyword === '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No forms downloaded yet.</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No results match your search criteria.
              </Text>
            </View>
          )
        ) : searchKeyword === '' ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No forms has been downloaded. Reconnect and download the form
              first to use when offline.
            </Text>
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
  networkInfo: selectNetworkInfo,
});

export default connect(mapState, {
  goToOfflineLinkedItemScreen,
  updateOfflineCurrentFormId,
  goToOfflineFormFieldsScreen,
  deleteOfflineForm,
})(OfflineFormList);
