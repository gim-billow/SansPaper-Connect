import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import ItemWrapper from '../ItemWrapper';
import {split, pipe, map} from 'ramda';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import QueryOptions from './QueryOptions';
import Milestone from './Milestone';
import CategorizedTools from './CategorizedTools';
import Tools from './Tools';

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

    this.updateSetOptions(selOptions, [item.value]);
  }

  updateSetOptions = (options, value) => {
    this.setState({selOptions: options, options: value});
  };

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    this.setState({options: selectedItems});
    updateFieldsValue({rank: item.rank, value: selectedItems[0]});
  };

  renderByOptionTypes = () => {
    const {item, organization, updateFieldsValue} = this.props;
    const {container, selectToggle, selectedItem, button, itemText} = styles;
    const {seloptions, mandatory} = item;

    if (seloptions.includes('Query.options')) {
      return (
        <View>
          {mandatory === 1 ? <MandatoryField /> : null}
          <QueryOptions
            {...item}
            organization={organization}
            updateFieldsValue={updateFieldsValue}
            styles={styles}
          />
        </View>
      );
    } else if (seloptions.includes('milestone')) {
      return (
        <View>
          {mandatory === 1 ? <MandatoryField /> : null}
          <Milestone
            {...item}
            organization={organization}
            updateFieldsValue={updateFieldsValue}
            styles={styles}
          />
        </View>
      );
    } else if (seloptions.includes('categorizedTools')) {
      return (
        <View>
          {mandatory === 1 ? <MandatoryField /> : null}
          <CategorizedTools
            {...item}
            organization={organization}
            updateFieldsValue={updateFieldsValue}
            styles={styles}
          />
        </View>
      );
    } else if (seloptions.includes('tools.groups')) {
      return (
        <View>
          {mandatory === 1 ? <MandatoryField /> : null}
          <Tools
            {...item}
            organization={organization}
            updateFieldsValue={updateFieldsValue}
            styles={styles}
          />
        </View>
      );
    } else {
      return (
        <View>
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
            selectedItems={this.state.options}
          />
        </View>
      );
    }
  };

  render() {
    const {item} = this.props;

    return (
      <ItemWrapper>
        <Text style={styles.text}>{item.label}</Text>
        {this.renderByOptionTypes()}
      </ItemWrapper>
    );
  }
}

export default Select;
