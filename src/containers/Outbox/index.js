//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  Platform,
} from 'react-native';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import memoize from 'memoize-one';
import {filter, includes, findIndex} from 'ramda';
import {Icon, Card, SearchBar} from 'react-native-elements';

import {
  selectOutbox,
  selectOfflineFormList,
  selectOfflineCurrentForm,
} from '@selector/form';
import {
  deleteOutboxForm,
  loadOutboxByStatus,
  loadAllOutbox,
  saveAsDraft,
} from '@store/forms';
import {goToDraftFormFieldsScreen} from '@store/navigate';
import styles from './styles';
import {red, lightGrey, white, veryLightGrey} from '@styles/colors';
import {displayDate} from '@util/general';
import {selectOfflineFeature, selectBetaAccess} from '@selector/user';
import {cardStyle, searchBarStyle, commonStyles} from '@styles/common';
import {CommonImages} from '@constant/Images';

const renderImage = (source) => (
  <Image source={source} resizeMode="contain" style={{width: 20, height: 20}} />
);

class Outbox extends React.Component {
  state = {
    searchKeyword: '',
    filterLabel: 'All forms',
    filtered: 'all',
  };

  onFilterOutboxList = () => {
    const {loadOutboxByStatus, loadAllOutbox} = this.props;
    const options = ['Draft', 'Submitted', 'All', 'Cancel'];
    const icons = [
      renderImage(CommonImages.formDraft),
      // renderImage(CommonImages.formPending),
      renderImage(CommonImages.formSubmit),
      renderImage(CommonImages.formAll),
      renderImage(CommonImages.formClose),
    ];
    const cancelButtonIndex = 3;

    this.props.showActionSheetWithOptions(
      {
        options,
        icons,
        cancelButtonIndex,
        textStyle: {...commonStyles.actionSheetAndroid},
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            loadOutboxByStatus('draft');
            this.setState({filterLabel: 'Draft forms', filtered: 'draft'});
            break;
          /**
           * TODO: Will add back once background fetch functionality is added
           */
          // case 1:
          //   loadOutboxByStatus('pending');
          //   this.setState({filterLabel: 'Pending forms', filtered: 'pending'});
          //   break;
          case 1:
            loadOutboxByStatus('submitted');
            this.setState({
              filterLabel: 'Submitted forms',
              filtered: 'submitted',
            });
            break;
          case 2:
            loadAllOutbox();
            this.setState({filterLabel: 'All forms', filtered: 'all'});
            break;
          default:
            break;
        }
      },
    );
  };

  keyExtractor = (item, index) => index?.toString();

  getFilteredFormlist = memoize((outbox, searchKeyword) => {
    return filter(
      (item) =>
        includes(
          searchKeyword?.toLowerCase(),
          item?.value?.name?.toLowerCase(),
        ),
      outbox,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  onDeleteAlert = (id) => {
    const {filtered} = this.state;

    return Alert.alert(
      '',
      'Are you sure you want to delete the form?',
      [
        {
          text: 'Delete',
          onPress: () =>
            this.props.deleteOutboxForm({draftId: id, status: filtered}),
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
  };

  onNavigateToDraftScreen = (id, formId) => {
    const {offlineForms} = this.props;
    const offForms = [];

    offlineForms.map((form) => offForms.push(form.id));
    const index = findIndex((item) => item === formId)(offForms);

    if (index === -1) {
      Alert.alert('', 'Download the form first before viewing the form.');
      return;
    }

    this.props.goToDraftFormFieldsScreen({draftId: id, navigate: true});
  };

  onSwapFormStatus = (id, status) => {
    const {goToDraftFormFieldsScreen, saveAsDraft} = this.props;
    const {filtered} = this.state;

    if (status === 'submitted') {
      Alert.alert('', 'You cannot change the status of the submitted form.');
      return;
    }

    goToDraftFormFieldsScreen({draftId: id});
    setTimeout(() => {
      Alert.alert(
        '',
        `Change form status to ${status === 'draft' ? 'pending' : 'draft'}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => {
              saveAsDraft({
                offline: true,
                status: status === 'draft' ? 'pending' : 'draft',
                changeStatus: true,
                filterBy: filtered,
              });
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }, 500);
  };

  renderItem = ({item}) => {
    const {id, value, status, createdAt, updatedAt} = item;
    const {name, id: formId} = value;
    const createString = `Submitted on ${displayDate(createdAt)}`;
    const updateString = `Updated on ${displayDate(updatedAt)}`;

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
              style={{flexDirection: 'row'}}
              onPress={() => this.onNavigateToDraftScreen(id, formId)}
              /**
               * TODO: Will add back once background fetch functionality is added
               */
              // onLongPress={() => this.onSwapFormStatus(id, status)}
            >
              <View style={styles.titleView}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle1}>{createString}</Text>
                <Text style={styles.subTitle2}>{updateString}</Text>
              </View>
              <View style={styles.status}>
                <Text
                  style={
                    status === 'submitted' ? styles.submitted : styles.draft
                  }>
                  {status}
                </Text>
                <Icon name="navigate-next" color={lightGrey} />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {searchKeyword, filterLabel} = this.state;
    const {outbox, offlineFeature, betaAccess} = this.props;
    const filteredOutbox = this.getFilteredFormlist(outbox, searchKeyword);

    if (!offlineFeature && !betaAccess) {
      return (
        <>
          <View style={styles.header}>
            <SearchBar
              placeholder="Search outbox"
              containerStyle={searchBarStyle.searchContainer}
              inputContainerStyle={searchBarStyle.searchInputContainer}
              inputStyle={searchBarStyle.searchInput}
              searchIcon={{
                color: veryLightGrey,
              }}
              selectionColor={veryLightGrey}
              placeholderTextColor={veryLightGrey}
              value={searchKeyword}
              onChangeText={this.handleOnChangeText}
              clearIcon={{
                color: veryLightGrey,
              }}
            />
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.onFilterOutboxList}>
            <View style={styles.filterView}>
              {Platform.OS === 'android' ? (
                <Icon type="antdesign" name="filter" color={white} />
              ) : (
                <Icon type="ionicon" name="options-outline" color={white} />
              )}
              <Text style={styles.filterText}>{filterLabel}</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Offline access feature is expired. To continue using the feature,
              contact the administrator.
            </Text>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.header}>
          <SearchBar
            placeholder="Search outbox"
            containerStyle={searchBarStyle.searchContainer}
            inputContainerStyle={searchBarStyle.searchInputContainer}
            inputStyle={searchBarStyle.searchInput}
            searchIcon={{
              color: veryLightGrey,
            }}
            selectionColor={veryLightGrey}
            placeholderTextColor={veryLightGrey}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            clearIcon={{
              color: veryLightGrey,
            }}
          />
        </View>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.onFilterOutboxList}>
          <View style={styles.filterView}>
            {Platform.OS === 'android' ? (
              <Icon type="antdesign" name="filter" color={white} />
            ) : (
              <Icon type="ionicon" name="options-outline" color={white} />
            )}
            <Text style={styles.filterText}>{filterLabel}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.container}>
          {filteredOutbox && filteredOutbox.length > 0 ? (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={filteredOutbox}
              renderItem={this.renderItem}
              extraData={outbox}
            />
          ) : searchKeyword === '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No listed forms.</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No results match your search criteria.
              </Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

const mapState = createStructuredSelector({
  outbox: selectOutbox,
  offlineForms: selectOfflineFormList,
  offlineCurrentForm: selectOfflineCurrentForm,
  offlineFeature: selectOfflineFeature,
  betaAccess: selectBetaAccess,
});

export default connect(mapState, {
  goToDraftFormFieldsScreen,
  deleteOutboxForm,
  loadOutboxByStatus,
  saveAsDraft,
  loadAllOutbox,
})(connectActionSheet(Outbox));
