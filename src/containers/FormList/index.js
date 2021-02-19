//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {selectFormList} from '@selector/form/index';
import {updateCurrentFormId} from '@store/forms';
import {screens} from '@constant/ScreenConstants';
import {goToLinkedItemScreen, goToFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

class FormList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  onPress = (linked_table, form_id) => {
    const {
      goToLinkedItemScreen,
      updateCurrentFormId,
      goToFormFieldsScreen,
    } = this.props;

    updateCurrentFormId(form_id);
    if (linked_table && linked_table !== '') {
      goToLinkedItemScreen(linked_table);
    } else {
      goToFormFieldsScreen({componentId: screens.FormScreen});
    }
  };

  renderItem = ({item}) => {
    const {name, linkedtable, id} = item;
    return (
      <ItemWrapper>
        <ListItem
          onPress={() => this.onPress(linkedtable, id)}
          title={name}
          leftIcon={<Icon name="file-text-o" />}
          bottomDivider
          chevron
        />
      </ItemWrapper>
    );
  };

  render() {
    const {formList} = this.props;
    return (
      <FlatList
        style={styles.container}
        keyExtractor={this.keyExtractor}
        data={formList}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapState = createStructuredSelector({
  formList: selectFormList,
});

export default connect(mapState, {
  goToLinkedItemScreen,
  updateCurrentFormId,
  goToFormFieldsScreen,
})(FormList);
