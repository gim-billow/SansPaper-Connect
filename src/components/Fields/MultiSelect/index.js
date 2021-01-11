import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import {getQueryByOptions} from './helper';
class MultiSelect extends Component {
  state = {
    options: [],
    selOptions: [],
    setvalProject: '0000',
  };

  async componentDidMount() {
    const options = await getQueryByOptions(this.props);
    this.setState({selOptions: options});
  }

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    let value = selectedItems.toString().split(',').join('|');
    updateFieldsValue({rank: item.rank, value: value});
  };

  render() {
    const {item} = this.props;
    const {selOptions} = this.state;
    const {
      container,
      chipsWrapper,
      selectToggle,
      selectedItem,
      button,
      itemText,
    } = styles;

    return (
      <ItemWrapper>
        <Text style={styles.text}>{item.label}</Text>
        <View>
          {item.mandatory === 1 ? <MandatoryField /> : null}
          <SectionedMultiSelect
            styles={{
              container,
              chipsWrapper,
              selectToggle,
              selectedItem,
              button,
              itemText,
            }}
            items={selOptions}
            IconRenderer={Icon}
            uniqueKey="id"
            selectText="Select from options"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.options}
          />
        </View>
      </ItemWrapper>
    );
  }
}

export default MultiSelect;
