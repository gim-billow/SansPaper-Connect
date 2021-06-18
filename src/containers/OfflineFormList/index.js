//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import memoize from 'memoize-one';
import {Icon, Card, SearchBar} from 'react-native-elements';
import {filter, includes} from 'ramda';

import {selectOfflineFormList} from '@selector/form';
import {updateOfflineCurrentFormId, deleteOfflineForm} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {
  goToOfflineLinkedItemScreen,
  goToOfflineFormFieldsScreen,
} from '@store/navigate';

import styles from './styles';
import {darkGrey, red, lightGrey} from '@styles/colors';
import {cardStyle, searchBarStyle} from '@styles/common';

class OfflineFormList extends React.Component {
  state = {
    searchKeyword: '',
  };

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

  getFilteredFormlist = memoize((formList, searchKeyword) => {
    return filter(
      (form) =>
        includes(searchKeyword?.toLowerCase(), form?.name?.toLowerCase()),
      formList,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
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
                <Icon
                  type="ionicon"
                  name="trash-outline"
                  color={red}
                  size={20}
                />
                {/* <Icon name="delete" color={red} /> */}
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
    const {searchKeyword} = this.state;
    const {formList} = this.props;
    const filteredFromList = this.getFilteredFormlist(formList, searchKeyword);

    return (
      <View style={styles.flex1}>
        <SearchBar
          placeholder="Search offline form"
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
        {filteredFromList && filteredFromList.length > 0 ? (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={filteredFromList}
            renderItem={this.renderItem}
          />
        ) : searchKeyword === '' ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No forms downloaded yet.</Text>
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
  formList: selectOfflineFormList,
});

export default connect(mapState, {
  goToOfflineLinkedItemScreen,
  updateOfflineCurrentFormId,
  goToOfflineFormFieldsScreen,
  deleteOfflineForm,
})(OfflineFormList);
