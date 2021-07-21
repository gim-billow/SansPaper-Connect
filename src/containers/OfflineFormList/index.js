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
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {Icon, Card, Button} from 'react-native-elements';

import {selectOfflineFeature, selectBetaAccess} from '@selector/user';
import {requestFeatureSubscription} from '@store/user';
import {updateOfflineCurrentFormId, deleteOfflineForm} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {
  goToOfflineLinkedItemScreen,
  goToOfflineFormFieldsScreen,
} from '@store/navigate';

import styles from './styles';
import {red, lightGrey} from '@styles/colors';
import {cardStyle, subscriptionStyle} from '@styles/common';
import {selectNetworkInfo} from '@selector/common';

const {width} = Dimensions.get('screen');

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
      requestFeatureSubscription,
    } = this.props;

    if (!offlineFeature && !betaAccess) {
      return (
        <View style={subscriptionStyle.subscriptionContainer}>
          <Image
            source={require('../../assets/offline.png')}
            resizeMode="contain"
            style={{width: width, height: width / 2}}
          />
          <Button
            type="outline"
            title="Subscribe"
            titleStyle={subscriptionStyle.subscribeText}
            buttonStyle={subscriptionStyle.subscribeBtn}
            onPress={() => requestFeatureSubscription('Offline')}
          />
          <Text style={subscriptionStyle.subscriptionBottomText}>
            Email us to unlock the offline feature.
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
              No forms have been downloaded. Please connect to the internet and
              download a form (using the download button to the right of the
              form) to use here when offline.
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
  requestFeatureSubscription,
})(OfflineFormList);
