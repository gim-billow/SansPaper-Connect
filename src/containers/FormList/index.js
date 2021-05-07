//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import memoize from 'memoize-one';

import {ListItem, Icon} from 'react-native-elements';
import {selectOrganistationPath} from '@selector/sanspaper';
import {selectSortedFormList} from '@selector/form/index';
import {
  updateCurrentFormId,
  updateFormList,
  syncOfflineForm,
} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes} from 'ramda';
import {Spinner} from 'native-base';
import styles from './styles';
import {darkGrey} from '@styles/colors';

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
    this.props.syncOfflineForm({linkedTable: linked_table, formId: form_id});
  };

  getFilteredFormlist = memoize((formList, searchKeyword) => {
    return filter(
      (form) => includes(searchKeyword.toLowerCase(), form.name.toLowerCase()),
      formList,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => this.downloadForm(linkedtable, id)}>
          <Icon name="file-download" color={darkGrey} />
        </TouchableOpacity>
        <ItemWrapper>
          <ListItem
            key={id}
            bottomDivider
            onPress={() => this.onPress(linkedtable, id)}>
            <Icon name="assignment" color={darkGrey} />
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
            </ListItem.Content>
            {/* <ListItem.Chevron /> */}
          </ListItem>
        </ItemWrapper>
      </View>
    );
  };

  render() {
    const {searchKeyword} = this.state;
    const {formList} = this.props;
    const filteredFromList = this.getFilteredFormlist(formList, searchKeyword);

    return (
      <View style={styles.flex1}>
        <Searchbar
          placeholder="Search form"
          style={styles.searchbar}
          value={searchKeyword}
          onChangeText={this.handleOnChangeText}
          icon="search"
          clearIcon="clear"
        />
        {filteredFromList && filteredFromList.length > 0 ? (
          <FlatList
            style={styles.container}
            keyExtractor={this.keyExtractor}
            data={filteredFromList}
            renderItem={this.renderItem}
          />
        ) : searchKeyword === '' ? (
          <Spinner color="grey" />
        ) : (
          <Text>No results match your search criteria </Text>
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  formList: selectSortedFormList,
  orgPath: selectOrganistationPath,
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
  updateFormList,
  syncOfflineForm,
})(FormList);
