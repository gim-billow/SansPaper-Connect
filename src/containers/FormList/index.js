//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';

// import MIcon from 'react-native-vector-icons/MaterialIcons';
import memoize from 'memoize-one';
import {ListItem, Icon} from 'react-native-elements';
import {selectSortedFormList} from '@selector/form/index';
import {updateCurrentFormId} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes} from 'ramda';
import {Spinner} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  flex1: {
    flex: 1,
  },
  searchbar: {
    marginBottom: 10,
  },
});

class FormList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  state = {
    searchKeyword: '',
  };

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
          onChangeText={this.handleOnChangeText}
          icon="search"
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
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
})(FormList);
