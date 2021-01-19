import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import {getQueryByOptions} from './helper';
import R from 'ramda';

class Select extends Component {
  state = {
    options: [],
    selOptions: [],
    valProject: '0000',
  };

  async componentDidMount() {
    const {item} = this.props;
    const options = await getQueryByOptions(
      this.props,
      this.state.valProject,
      item.type,
    );
    this.updateSetOptions(options, [item.value]);
  }

  updateSetOptions = (options, value) => {
    const sortByNameCaseInsensitive = R.sortBy(
      R.compose(R.toLower, R.prop('name')),
    );

    let sortlist = sortByNameCaseInsensitive(options);

    var filteredOptions = sortlist.filter(function (el) {
      return el != null;
    });

    this.setState({
      selOptions: filteredOptions,
      options: value,
    });
  };

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    updateFieldsValue({rank: item.rank, value: selectedItems[0]});
  };

  render() {
    const {item} = this.props;
    const {selOptions} = this.state;
    const {container, selectToggle, selectedItem, button, itemText} = styles;

    return (
      <ItemWrapper>
        <Text style={styles.text}>{item.label}</Text>
        <View>
          {item.mandatory === 1 ? <MandatoryField /> : null}
          <SectionedMultiSelect
            styles={{
              container,
              selectToggle,
              selectedItem,
              button,
              itemText,
            }}
            items={selOptions}
            IconRenderer={Icon}
            uniqueKey="id"
            single
            selectText="Select from options"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.options}
          />
        </View>
      </ItemWrapper>
    );
  }
}

export default Select;
