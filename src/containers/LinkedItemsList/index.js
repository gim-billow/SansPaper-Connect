import React from 'react';
import {FlatList, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';
import {selectCurrentLinkedItems} from '@selector/form';
import {goToFormFieldsScreen} from '@store/navigate';
import {screens} from '@constant/ScreenConstants';
import styles from './styles';

class LinkedItemsList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  onPress = (linkedItemId) => {
    const {goToFormFieldsScreen} = this.props;
    goToFormFieldsScreen({linkedItemId, componentId: screens.LinkedItems});
    // onPress();
  };

  renderItem = ({item}) => {
    console.log('item', item);
    const {name, id} = item;
    return (
      <ListItem
        onPress={() => this.onPress(id)}
        title={name}
        leftIcon={<Icon name="file-text-o" />}
        bottomDivider
        chevron
      />
    );
  };

  render() {
    const {linkedItems = []} = this.props;
    console.log(linkedItems);
    return linkedItems.length > 0 ? (
      <FlatList
        style={styles.container}
        keyExtractor={this.keyExtractor}
        data={linkedItems}
        renderItem={this.renderItem}
      />
    ) : (
      <View>
        <Text> Error: please contact support</Text>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  linkedItems: selectCurrentLinkedItems,
});

export default connect(mapState, {goToFormFieldsScreen})(LinkedItemsList);
