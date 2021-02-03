import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Icon, Picker} from 'native-base';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

class Currency extends Component {
  state = {
    selected: 'AUD',
    data: [
      'AUD:Australian Dollars',
      'USD:U.S. Dollars',
      'EUR:Euro',
      'GBP:British Pound',
      'JPY:Japanese Yen',
      'CAD:Canadian Dollars',
      'CHF:Swiss Franc',
      'HKD:Hong Kong Dollars',
      'NZD:New Zealand Dollars',
      'SGD:Singapore Dollars',
      'LKR:Sri Lankan Rupee',
      'SEK:Swedish Krona',
    ],
  };

  onValueChange(value) {
    const {item, updateFieldsValue} = this.props;
    this.setState({selected: value});
    updateFieldsValue({rank: item.rank, value: value});
  }

  populatePicker = (data) => {
    const pickerOptions = data.sort().map((item, index) => {
      return (
        <Picker.Item
          label={item.split(':')[1]}
          value={item.split(':')[0]}
          key={index.toString()}
        />
      );
    });
    return pickerOptions;
  };
  render() {
    const {item} = this.props;
    const {data, selected} = this.state;
    return (
      <ItemWrapper>
        <Text style={styles.text}>{item.label}</Text>
        <View>
          <Picker
            mode="dropdown"
            style={styles.container}
            placeholder="Select from options"
            iosIcon={<Icon name="chevron-down" />}
            selectedValue={selected}
            onValueChange={this.onValueChange.bind(this)}>
            {this.populatePicker(data)}
          </Picker>
        </View>
      </ItemWrapper>
    );
  }
}

export default Currency;
