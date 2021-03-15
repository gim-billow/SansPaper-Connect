import React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import {createStructuredSelector} from 'reselect';
import {selectCurrentLinkedItems, selectCurrentForm} from '@selector/form';
import {goToFormFieldsScreen} from '@store/navigate';
import {screens} from '@constant/ScreenConstants';
import styles from './styles';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import R from 'ramda';

class LinkedItemsList extends React.Component {
  state = {
    options: [],
    selOptions: [],
  };

  async componentDidMount() {
    const {linkedItems = []} = this.props;
    const filteredOptions = R.pipe(
      R.sortBy(R.compose(R.toLower, R.prop('name'))),
      R.filter((option) => !R.isNil(option)),
    )(linkedItems);

    this.updateSelOptions(filteredOptions);
  }

  updateSelOptions = (options) => {
    this.setState({selOptions: options});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => {
    const {name, id} = item;
    return (
      <ListItem key={id} bottomDivider onPress={() => this.onPress(id)}>
        <Icon name="file-text-o" type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  onSelectedItemsChange = (id) => {
    const {goToFormFieldsScreen} = this.props;
    goToFormFieldsScreen({linkedItemId: id, componentId: screens.LinkedItems});
  };

  render() {
    const {name} = this.props.currentForm;
    const {container, selectToggle, button, itemText, text} = styles;

    return this.state.selOptions.length > 0 ? (
      <ItemWrapper>
        <Text
          style={
            text
          }>{`Please select the item you are completing "${name}" for:`}</Text>
        <View>
          <SectionedMultiSelect
            styles={{
              container,
              selectToggle,
              button,
              itemText,
            }}
            items={this.state.selOptions}
            IconRenderer={Icon}
            uniqueKey="id"
            single={true}
            selectText="Select from options"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.options}
          />
        </View>
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
  currentForm: selectCurrentForm,
});

export default connect(mapState, {goToFormFieldsScreen})(LinkedItemsList);
