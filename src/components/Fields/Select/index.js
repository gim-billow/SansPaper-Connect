import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import {getQueryByOptions} from './helper';

class Select extends Component {
  state = {
    options: [],
    selOptions: [],
    queryOptionsMode: true,
    counter: 0,
    setvalProject: '0000',
  };

  async componentDidMount() {
    const {item} = this.props;
    if (item.seloptions.includes('categorizedTools')) {
      setTimeout(() => {
        this.setState({counter: this.state.counter + 1});
      }, 500);

      this.setState({setvalProject: this.props.callback.fields[0].value});
    }

    const options = await getQueryByOptions(this.props);
    console.log('options', options);
    this.setState({selOptions: options, options: [item.value]});
  }

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
