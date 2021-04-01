//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';
import memoize from 'memoize-one';

import {ListItem, Icon} from 'react-native-elements';
import {selectOrganistationPath} from '@selector/sanspaper';
import {selectSortedFormList} from '@selector/form/index';
import {updateCurrentFormId, updateFormList} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes} from 'ramda';
import {getUpviseTemplateForms} from './helper';
import {Spinner} from 'native-base';
import styles from './styles';

class FormList extends React.Component {
  state = {
    searchKeyword: '',
    refresh: false,
  };

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  fetchUpdatedTemplates = async () => {
    const {updateFormList} = this.props;
    const forms = await getUpviseTemplateForms(this.props.orgPath);

    updateFormList(forms);
  };

  keyExtractor = (item, index) => index.toString();

  onPress = (linked_table, form_id) => {
    const {
      goToLinkedItemScreen,
      updateCurrentFormId,
      goToFormFieldsScreen,
    } = this.props;

    updateCurrentFormId(form_id);
    if (linked_table && linked_table !== '') {
      goToLinkedItemScreen({linkedTable: linked_table});
    } else {
      goToFormFieldsScreen({componentId: screens.FormScreen});
    }
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

  onRefresh = () => {
    this.setState({refresh: true});

    // get updated template forms
    this.fetchUpdatedTemplates();

    this.wait(2000).then(() => this.setState({refresh: false}));
  };

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;
    return (
      <ItemWrapper>
        <ListItem
          key={id}
          bottomDivider
          onPress={() => this.onPress(linkedtable, id)}>
          <Icon name="file-text-o" type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>{name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ItemWrapper>
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
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.refresh}
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
})(FormList);
