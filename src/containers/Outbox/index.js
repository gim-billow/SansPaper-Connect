//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import memoize from 'memoize-one';
import {filter, includes, findIndex} from 'ramda';
import {Icon, Card, SearchBar} from 'react-native-elements';

import {selectOutbox} from '@selector/form';
import {
  deleteOutboxForm,
  loadOutboxByStatus,
  loadAllOutbox,
} from '@store/forms';
import {goToDraftFormFieldsScreen} from '@store/navigate';
import styles from './styles';
import {red, darkGrey, lightGrey} from '@styles/colors';
import {displayDate} from '@util/general';
import {selectOfflineFormList, selectOfflineCurrentForm} from 'selector/form';
import {cardStyle, searchBarStyle} from '@styles/common';

class Outbox extends React.Component {
  state = {
    searchKeyword: '',
    filterLabel: 'All forms',
  };

  onFilterOutboxList = () => {
    const {loadOutboxByStatus, loadAllOutbox} = this.props;
    const options = ['Draft', 'Pending', 'Submitted', 'All', 'Cancel'];
    const cancelButtonIndex = 4;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            loadOutboxByStatus('draft');
            this.setState({filterLabel: 'Draft forms'});
            break;
          case 1:
            loadOutboxByStatus('pending');
            this.setState({filterLabel: 'Pending forms'});
            break;
          case 2:
            loadOutboxByStatus('submitted');
            this.setState({filterLabel: 'Submitted forms'});
            break;
          case 3:
            loadAllOutbox();
            this.setState({filterLabel: 'All forms'});
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

  onDeleteAlert = (id) =>
    Alert.alert(
      '',
      'Are you sure you want to delete the form?',
      [
        {
          text: 'Delete',
          onPress: () => this.props.deleteOutboxForm(id),
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

  onNavigateToDraftScreen = (id, formId) => {
    const {offlineForms} = this.props;
    const offForms = [];

    offlineForms.map((form) => offForms.push(form.id));
    const index = findIndex((item) => item === formId)(offForms);

    if (index === -1) {
      Alert.alert('', 'Download the form first before viewing the form.');
      return;
    }

    this.props.goToDraftFormFieldsScreen(id);
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
                <Icon
                  type="ionicon"
                  name="trash-outline"
                  color={red}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => this.onNavigateToDraftScreen(id, formId)}>
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
    const {outbox} = this.props;
    const filteredOutbox = this.getFilteredFormlist(outbox, searchKeyword);

    return (
      <>
        <TouchableOpacity
          style={styles.filterView}
          onPress={() => this.onFilterOutboxList('draft')}>
          <Icon type="ionicon" name="options-outline" color={darkGrey} />
          <Text style={styles.filterText}>{filterLabel}</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <SearchBar
            placeholder="Search outbox"
            containerStyle={searchBarStyle.searchContainer}
            inputContainerStyle={searchBarStyle.searchInputContainer}
            inputStyle={searchBarStyle.searchInput}
            searchIcon={{
              color: darkGrey,
            }}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            icon="search"
            clearIcon="clear"
          />
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
});

export default connect(mapState, {
  goToDraftFormFieldsScreen,
  deleteOutboxForm,
  loadOutboxByStatus,
  loadAllOutbox,
})(connectActionSheet(Outbox));
