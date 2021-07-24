import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {findIndex, propEq} from 'ramda';

import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';

class Currency extends Component {
  state = {
    selected: [],
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

  componentDidMount() {
    const {value} = this.props.item;
    const {data} = this.state;
    const foundIndex = findIndex(propEq('value', value))(data);

    if (foundIndex > -1) {
      this.setDefaultValue(foundIndex);
    }
  }

  setDefaultValue(index) {
    this.setState({selected: [index]});
  }

  onValueChange(value) {
    const {item, updateFieldsValue, draftFormHasChanges, draftId} = this.props;
    const found = this.state.data.find((cur) => cur.id === value[0]);

    if (draftId) draftFormHasChanges(true);
    this.setState({selected: [...value]});
    updateFieldsValue({rank: item.rank, value: found.value});
  }

  render() {
    const {item, isEditable} = this.props;
    const {data, selected} = this.state;
    const {
      container,
      selectToggle,
      button,
      itemText,
      confirmText,
      searchBar,
      selectToggleText,
      chipsWrapper,
      chipText,
      chipContainer,
    } = styles;

    return (
      <>
        <View style={styles.topContainer}>
          <Text style={commonStyles.title}>{item.label}</Text>
          {item.mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View>
            <SectionedMultiSelect
              disabled={!isEditable}
              styles={{
                confirmText,
                container,
                searchBar,
                selectToggle,
                button,
                itemText,
                selectToggleText,
                chipsWrapper,
                chipText,
                chipContainer,
              }}
              items={data}
              IconRenderer={Icon}
              showCancelButton
              uniqueKey="id"
              single={true}
              selectText="Search from items"
              searchPlaceholderText="Search from items"
              onSelectedItemsChange={this.onValueChange.bind(this)}
              selectedItems={selected}
            />
          </View>
        </View>
      </>
    );
  }
}

export default Currency;
