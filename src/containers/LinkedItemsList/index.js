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
import ItemWrapper from '../../components/Fields/ItemWrapper';
import R from 'ramda';

class LinkedItemsList extends React.Component {
  keyExtractor = (item, index) => index.toString();

  onPress = (linkedItemId) => {
    const {goToFormFieldsScreen} = this.props;
    goToFormFieldsScreen({linkedItemId, componentId: screens.LinkedItems});
    // onPress();
  };

  renderItem = ({item}) => {
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
    const filteredOptions = R.pipe(
      R.sortBy(R.compose(R.toLower, R.prop('name'))),
      R.filter((option) => !R.isNil(option)),
    )(linkedItems);

    return filteredOptions.length > 0 ? (
      <ItemWrapper>
        <FlatList
          style={styles.container}
          keyExtractor={this.keyExtractor}
          data={filteredOptions}
          renderItem={this.renderItem}
        />
      </ItemWrapper>
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
