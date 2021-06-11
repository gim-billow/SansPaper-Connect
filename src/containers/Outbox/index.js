//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import memoize from 'memoize-one';
import {filter, includes, findIndex, propEq} from 'ramda';

import {ListItem, Icon} from 'react-native-elements';
import {selectOutbox} from '@selector/form';
import {
  deleteOutboxForm,
  loadOutboxByStatus,
  loadAllOutbox,
} from '@store/forms';
import {goToDraftFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import styles from './styles';
import {red} from '@styles/colors';
import {displayDate} from '@util/general';
import {selectOfflineFormList, selectOfflineCurrentForm} from 'selector/form';

class Outbox extends React.Component {
  state = {
    searchKeyword: '',
    refresh: false,
    filterLabel: 'All',
  };

  onFilterOutboxList = () => {
    const {loadOutboxByStatus, loadAllOutbox} = this.props;
    const options = ['Draft', 'Submitted', 'All', 'Cancel'];
    const cancelButtonIndex = 3;

    this.props.showActionSheetWithOptions(
      {
        title: 'Filter by',
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            loadOutboxByStatus('draft');
            this.setState({filterLabel: options[buttonIndex]});
            break;
          case 1:
            loadOutboxByStatus('submitted');
            this.setState({filterLabel: options[buttonIndex]});
            break;
          case 2:
            loadAllOutbox();
            this.setState({filterLabel: options[buttonIndex]});
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

  onNavigateToDraftScreen = (id, status) => {
    const {offlineForms, outbox} = this.props;
    const outboxes = [];
    const offForms = [];

    outbox.map((box) => outboxes.push(box.value.id));
    offlineForms.map((form) => offForms.push(form.id));

    const downloaded = outboxes.some((item) => offForms.includes(item));

    if (status === 'submitted' && !downloaded) {
      Alert.alert(
        '',
        'Download the form first before viewing the submitted form.',
      );
      return;
    }

    this.props.goToDraftFormFieldsScreen(id);
  };

  renderItem = ({item}) => {
    const {id, value, status, createdAt, updatedAt} = item;
    const {name} = value;
    const createString = `Submitted on ${displayDate(createdAt)}`;
    const updateString = `Updated on ${displayDate(updatedAt)}`;

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => this.onDeleteAlert(id)}>
          <Icon name="delete" color={red} />
        </TouchableOpacity>
        <ItemWrapper>
          <ListItem
            key={id}
            bottomDivider
            onPress={() => this.onNavigateToDraftScreen(id, status)}>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle style={{fontSize: 10}}>
                {createString}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{fontSize: 10}}>
                {updateString}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text style={status === 'draft' ? styles.draft : styles.submitted}>
              {status}
            </Text>
            <ListItem.Chevron />
          </ListItem>
        </ItemWrapper>
      </View>
    );
  };

  render() {
    const {searchKeyword, filterLabel} = this.state;
    const {outbox} = this.props;
    const filteredOutbox = this.getFilteredFormlist(outbox, searchKeyword);

    return (
      <>
        <View style={styles.filterView}>
          <TouchableOpacity
            style={styles.filterTouch}
            onPress={() => this.onFilterOutboxList('draft')}>
            <Icon name="filter-list" />
            <Text style={{paddingLeft: 5}}>{filterLabel}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex1}>
          <Searchbar
            placeholder="Search outbox"
            style={styles.searchbar}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            icon="search"
            clearIcon="clear"
          />
          {outbox && outbox.length > 0 ? (
            <FlatList
              style={styles.container}
              keyExtractor={this.keyExtractor}
              data={filteredOutbox}
              renderItem={this.renderItem}
              refreshing={this.state.refresh}
              extraData={outbox}
            />
          ) : searchKeyword === '' ? (
            <View style={styles.emptyContainer}>
              <Text>No submitted form </Text>
            </View>
          ) : (
            <Text>No results match your search criteria </Text>
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
