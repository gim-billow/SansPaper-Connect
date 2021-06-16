//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import memoize from 'memoize-one';
import {Spinner} from 'native-base';

import {ListItem, Icon} from 'react-native-elements';
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
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes, findIndex, propEq} from 'ramda';

import styles from './styles';
import {darkGrey, green} from '@styles/colors';

class FormList extends React.Component {
  state = {
    searchKeyword: '',
  };

  // componentDidMount() {}

  // shouldComponentUpdate(nextProps) {
  //   const {formList} = this.props;
  //   if (nextProps.offlineForms.length !== this.props.offlineForms.length) {
  //     this.getFilteredFormlist(formList, this.state.searchKeyword);
  //     return true;
  //   }

  //   return true;
  // }

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
      <View style={styles.row}>
        {index === -1 ? (
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => this.downloadForm(linkedtable, id)}>
            <Icon name="file-download" color={darkGrey} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={styles.downloadButton}
            onPress={() => {}}>
            <Icon name="offline-pin" color={green} />
          </TouchableOpacity>
        )}
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
    const {formList, offlineForms} = this.props;
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
            extraData={offlineForms} // for ui rerendering
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
  offlineForms: selectOfflineFormList,
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
  updateFormList,
  syncOfflineForm,
})(FormList);
