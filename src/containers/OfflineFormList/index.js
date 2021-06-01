//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity, Alert} from 'react-native';
import {Searchbar} from 'react-native-paper';
import memoize from 'memoize-one';

import {ListItem, Icon} from 'react-native-elements';
import {selectOfflineFormList} from '@selector/form';
import {updateOfflineCurrentFormId, deleteOfflineForm} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {
  goToOfflineLinkedItemScreen,
  goToOfflineFormFieldsScreen,
} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes} from 'ramda';
import styles from './styles';
import {red} from '@styles/colors';

class OfflineFormList extends React.Component {
  state = {
    searchKeyword: '',
    refresh: false,
  };

  keyExtractor = (item, index) => index?.toString();

  onPress = (linked_table, form_id) => {
    const {
      goToOfflineLinkedItemScreen,
      updateOfflineCurrentFormId,
      goToFormFieldsScreen,
    } = this.props;

    updateOfflineCurrentFormId(form_id);
    if (linked_table && linked_table !== '') {
      goToOfflineLinkedItemScreen({linkedTable: linked_table});
    } else {
      goToFormFieldsScreen({componentId: screens.FormScreen});
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
      'Remove Form',
      'Are you sure you want to remove the downloaded form?',
      [
        {
          text: 'Delete',
          onPress: () => this.props.deleteOfflineForm(id),
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
            onPress={() => this.onPress(linkedtable, id)}>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
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
            refreshing={this.state.refresh}
          />
        ) : searchKeyword === '' ? (
          <View style={styles.emptyContainer}>
            <Text>No forms downloaded yet </Text>
          </View>
        ) : (
          <Text>No results match your search criteria </Text>
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
