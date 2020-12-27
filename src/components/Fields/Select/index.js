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
    counter: 0,
    valProject: '0000',
  };

  async componentDidMount() {
    const {item} = this.props;

    if (
      item.seloptions.includes('categorizedTools') ||
      item.seloptions.includes('milestone')
    ) {
      this.optionCounter();
    }

    const options = await getQueryByOptions(this.props, this.state.valProject);
    this.updateSetOptions(options, [item.value]);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  optionCounter = () => {
    this.timer = setTimeout(
      () => this.setState({counter: this.state.counter + 1}),
      500,
    );

    this.setState({valProject: this.props.currentFormFields[0].value});
  };

  updateSetOptions = (options, value) => {
    this.setState({selOptions: options, options: value});
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
