import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import ItemWrapper from '../ItemWrapper';
import {split, pipe, map} from 'ramda';
import {regExpQuote, regExpDoubleQuote} from '@util/regexp';
import {getOptions, getToolGroups} from '@api/upvise/util';
import styles from './styles';
import MandatoryField from '../MandatoryField';

class Select extends Component {
  state = {
    options: [],
    selOptions: [],
    queryOptionsMode: true,
    counter: 0,
    setvalProject: '0000',
  };

  componentDidMount() {
    const {item} = this.props;
    if (item.seloptions.includes('categorizedTools')) {
      setTimeout(() => {
        this.setState({counter: this.state.counter + 1});
      }, 500);

      this.setState({setvalProject: this.props.callback.fields[0].value});
    }

    this.onQueryByOptions();
  }

  updateSetOptions = (options, value) => {
    this.setState({selOptions: options, options: value});
  };

  onQueryByOptions = async () => {
    const {seloptions, value} = this.props.item;
    const {organization} = this.props;
    let formattedData;

    if (seloptions.includes('Query.options')) {
      const queryArr = seloptions.split(',');
      const table = regExpQuote.exec(queryArr[0])[1];
      const query = regExpDoubleQuote.exec(queryArr[1])[1];
      const queriedOptions = await getOptions(table, query, organization);
      formattedData = this._mapJSONToPickerItem(queriedOptions.data.items);
    } else if (seloptions.includes('tools.group')) {
      const queriedOptions = await getToolGroups(organization);
      formattedData = this._mapJSONToPickerItem(queriedOptions.data.items);
    } else if (seloptions.includes('categorizedTools')) {
      const table = 'tools.tools'; //we're getting the milestones.
      const query = 'groupid="' + this.state.valProject + '"';
      const queriedOptions = await getOptions(table, query, organization);
      formattedData = this._mapJSONToPickerItem(queriedOptions.data.items);
    } else if (seloptions.includes('milestone')) {
      // TODO:
    } else {
      formattedData = pipe(
        split('|'),
        map((opt, i) => {
          const optArr = split(':', opt);
          return {id: optArr[0], name: optArr[1] || optArr[0]};
        }),
      )(seloptions);
    }

    this.setState({selOptions: formattedData, options: [value]});
  };

  _mapJSONToPickerItem = (arr) => {
    return arr.map((val) => {
      return {
        id: val.id,
        name: val.name,
      };
    });
  };

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    updateFieldsValue({rank: item.rank, value: selectedItems[0]});
  };

  render() {
    const {item} = this.props;
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
            items={this.state.selOptions}
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
