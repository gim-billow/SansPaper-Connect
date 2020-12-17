import React, {Component} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import ItemWrapper from '../ItemWrapper';
import {split, pipe, map} from 'ramda';
import styles from './styles';
import MandatoryField from '../MandatoryField';

class Select extends Component {
  state = {
    options: [],
    selOptions: [],
    queryOptionsMode: true,
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
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({selOptions, options: [item.value]});
    console.log('selOptions:', selOptions);
  }

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    updateFieldsValue({rank: item.rank, value: selectedItems[0]});
    console.log('value:', selectedItems[0]);
  };

  // onSelectedItemObjectsChange = (selectedItemObjects) => {
  //   const {queryOptionsMode} = this.state;
  //   const value = queryOptionsMode
  //     ? pluck('id', selectedItemObjects).join('|')
  //     : pluck('name', selectedItemObjects).join('|');
  //   this.props.callback.fields[this.props.keyIndex].value = value;
  //   this.setState({selectedItemObjects});
  // };

  render() {
    const {label, mandatory} = this.props.item;
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
        <Text style={text}>{label}</Text>
        {mandatory === 1 ? <MandatoryField /> : null}
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
          // onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}
          selectedItems={this.state.options}
        />
      </ItemWrapper>
    );
  }
}

export default Select;
