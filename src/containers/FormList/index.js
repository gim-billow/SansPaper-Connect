//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {selectFormList} from '@selector/form/index';
import {loadLinkedItems, updateCurrentFormId} from '@store/forms';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

class FormList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  onPress = (linked_table, form_id) => {
    const {loadLinkedItems, updateCurrentFormId} = this.props;

    updateCurrentFormId(form_id);
    if (linked_table && linked_table !== '') {
      loadLinkedItems(linked_table);
    } else {
      console.log('not load like items');
      const {componentId} = this.props;
      const payload = {passProps: {}, componentId};
      //pushScreenFormScreen(payload);
    }
  };

  renderItem = ({item}) => {
    console.log('renderItem', item);
    const {name, linkedtable, id} = item;
    return (
      <ListItem
        onPress={() => this.onPress(linkedtable, id)}
        title={name}
        leftIcon={<Icon name="file-text-o" />}
        bottomDivider
        chevron
      />
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

export default connect(mapState, {loadLinkedItems, updateCurrentFormId})(
  FormList,
);
