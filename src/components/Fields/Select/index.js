import React, {Component} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import ItemWrapper from '../ItemWrapper';
import {split, pipe, map} from 'ramda';
import styles from './styles';

class Select extends Component {
  state = {
    options: [],
    selOptions: [],
  };

  componentDidMount() {
    const {item} = this.props;
    const selOptions = pipe(
      split('|'),
      map((opt, i) => {
        const optArr = split(':', opt);
        return {id: optArr[0], name: optArr[1] || optArr[0]};
      }),
    )(item.seloptions);

    this.setState({selOptions, options: [item.value]});
  }

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    updateFieldsValue({rank: item.rank, value: selectedItems[0]});
  };

  render() {
    const {item} = this.props;
    const {
      container,
      selectToggle,
      selectedItem,
      button,
      text,
      itemText,
    } = styles;

    return (
      <ItemWrapper>
        <Text style={text}>{item.label}</Text>
        <SectionedMultiSelect
          styles={{
            container,
            selectToggle,
            selectedItem,
            button,
            itemText,
          }}
          items={this.state.selOptions}
          IconRenderer={Icon}
          uniqueKey="id"
          single
          selectText="Select from options"
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.options}
        />
      </ItemWrapper>
    );
  }
}

export default Select;
