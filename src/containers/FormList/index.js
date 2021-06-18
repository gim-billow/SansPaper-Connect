//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import memoize from 'memoize-one';
import {Icon, Card, SearchBar} from 'react-native-elements';
import {filter, includes, findIndex, propEq} from 'ramda';

import {selectOrganistationPath} from '@selector/sanspaper';
import {
  selectSortedFormList,
  selectOfflineFormList,
} from '@selector/form/index';
import {
  updateCurrentFormId,
  updateFormList,
  syncOfflineForm,
} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';

import styles from './styles';
import {lightGrey, green, darkGrey} from '@styles/colors';
import {cardStyle, searchBarStyle} from '@styles/common';

class FormList extends React.Component {
  state = {
    searchKeyword: '',
  };

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

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;
    const {offlineForms} = this.props;

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
            <View style={{flexDirection: 'row'}}>
              {/* <Icon name="assignment" color={lightGrey} /> */}
              <Icon
                type="ionicon"
                name="document-text-outline"
                color={darkGrey}
                size={20}
              />
              {index === -1 ? (
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => this.downloadForm(linkedtable, id)}>
                  {/* <Icon name="file-download" color={darkGrey} /> */}
                  <Icon
                    type="ionicon"
                    name="download-outline"
                    color={darkGrey}
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled
                  style={styles.downloadButton}
                  onPress={() => {}}>
                  {/* <Icon name="offline-pin" color={green} /> */}
                  <Icon
                    type="ionicon"
                    name="checkmark-circle"
                    color={green}
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const {searchKeyword} = this.state;
    const {formList, offlineForms} = this.props;
    const filteredFromList = this.getFilteredFormlist(formList, searchKeyword);

    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search online form"
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
            extraData={offlineForms}
          />
        ) : searchKeyword === '' ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="grey" />
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
  formList: selectSortedFormList,
  orgPath: selectOrganistationPath,
  offlineForms: selectOfflineFormList,
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
  updateFormList,
  syncOfflineForm,
})(FormList);
