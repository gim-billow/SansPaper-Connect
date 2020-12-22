import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../../ItemWrapper';

class CategorizedTools extends Component {
  state = {
    options: [],
    selectedOptions: [],
  };

  render() {
    return (
      <ItemWrapper>
        <SectionedMultiSelect
          styles={{...this.props.styles}}
          items={this.state.options}
          IconRenderer={Icon}
          uniqueKey="name"
          single
          selectText="Select from options"
          onSelectedItemsChange={() => {}}
          selectedItems={this.state.selected}
        />
      </ItemWrapper>
    );
  }
}

export default CategorizedTools;
