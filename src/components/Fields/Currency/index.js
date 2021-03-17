import React, {Component} from 'react';
import {Text, View} from 'react-native';
// import {Icon, Picker} from 'native-base';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';

class Currency extends Component {
  state = {
    selected: [0],
    data: [
      {
        name: 'Australian Dollars',
        value: 'AUD',
        id: 0,
      },
      {
        name: 'U.S. Dollars',
        value: 'USD',
        id: 1,
      },
      {
        name: 'Euro',
        value: 'EUR',
        id: 2,
      },
      {
        name: 'British Pound',
        value: 'GBP',
        id: 3,
      },
      {
        name: 'Japanese Yen',
        value: 'JPY',
        id: 4,
      },
      {
        name: 'Canadian Dollars',
        value: 'CAD',
        id: 5,
      },
      {
        name: 'Swiss Franc',
        value: 'CHF',
        id: 6,
      },
      {
        name: 'Hong Kong Dollars',
        value: 'HKD',
        id: 7,
      },
      {
        name: 'New Zealand Dollars',
        value: 'NZD',
        id: 8,
      },
      {
        name: 'Singapore Dollars',
        value: 'SGD',
        id: 9,
      },
      {
        name: 'Sri Lankan Rupee',
        value: 'LKR',
        id: 10,
      },
      {
        name: 'Swedish Krona',
        value: 'SEK',
        id: 11,
      },
    ],
  };

  onValueChange(value) {
    const {item, updateFieldsValue} = this.props;
    const found = this.state.data.find((cur) => cur.id === value[0]);

    this.setState({selected: [...value]});
    updateFieldsValue({rank: item.rank, value: found.value});
  }

  // populatePicker = (data) => {
  //   const pickerOptions = data.sort().map((item, index) => {
  //     return (
  //       <Picker.Item
  //         label={item.split(':')[1]}
  //         value={item.split(':')[0]}
  //         key={index.toString()}
  //       />
  //     );
  //   });
  //   return pickerOptions;
  // };
  render() {
    const {item} = this.props;
    const {data, selected} = this.state;
    const {container, selectToggle, button, itemText, topContainer} = styles;

    return (
      <ItemWrapper>
        <View style={topContainer}>
          <Text style={commonStyles.text}>{item.label}</Text>
          {item.mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View>
            <SectionedMultiSelect
              styles={{
                container,
                selectToggle,
                button,
                itemText,
              }}
              items={data}
              searchPlaceholderText="Search from items"
              IconRenderer={Icon}
              uniqueKey="id"
              single={true}
              showCancelButton
              selectText="Select from options"
              onSelectedItemsChange={this.onValueChange.bind(this)}
              selectedItems={selected}
            />
            {/* <Picker
              mode="dropdown"
              style={styles.container}
              placeholder="Select from options"
              iosIcon={<Icon name="chevron-down" />}
              selectedValue={selected}
              onValueChange={this.onValueChange.bind(this)}>
              {this.populatePicker(data)}
            </Picker> */}
          </View>
        </View>
        <Divider />
      </ItemWrapper>
    );
  }
}

export default Currency;
