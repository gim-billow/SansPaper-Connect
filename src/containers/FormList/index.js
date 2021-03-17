//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/FontAwesome';
import memoize from 'memoize-one';
import {ListItem, Icon} from 'react-native-elements';
import {selectSortedFormList} from '@selector/form/index';
import {updateCurrentFormId} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import R from 'ramda';
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

  getFilteredFormlist = memoize(() => {
    const {formList} = this.props;
    
    return formList;
  });

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
    const filteredFromList = this.getFilteredFormlist();

    return filteredFromList && filteredFromList.length > 0 ? (
      <View style={styles.flex1}>
        <Searchbar placeholder="Search" style={styles.searchbar} />
        <FlatList
          style={styles.container}
          keyExtractor={this.keyExtractor}
          data={filteredFromList}
          renderItem={this.renderItem}
        />
      </View>
    ) : (
      <Spinner color="grey" />
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
