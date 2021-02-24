import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import MandatoryField from '../MandatoryField';
import {getQueryByOptions} from './helper';
import {selectProjectValue} from 'selector/form';
import R from 'ramda';

class Select extends Component {
  state = {
    options: [],
    selOptions: [
      {
        id: '',
        name: 'None',
      },
    ],
  };

  async componentDidMount() {
    const {seloptions, type} = this.props.item;
    const {organization, projectValue, item} = this.props;
    const options = await getQueryByOptions(
      seloptions,
      type,
      organization,
      projectValue,
    );
    this.updateSetOptions(options, [item.value]);
  }

  async componentDidUpdate(prevProps) {
    const {projectValue} = prevProps;
    if (projectValue !== this.props.projectValue) {
      const {item} = this.props;
      const options = await getQueryByOptions(this.props);
      this.updateSetOptions(options, [item.value]);
    }
  }

  updateSetOptions = (options, value) => {
    const filteredOptions = R.pipe(
      R.sortBy(R.compose(R.toLower, R.prop('name'))),
      R.filter((option) => !R.isNil(option)),
    )(options);

    this.setState((prevState) => ({
      selOptions: [...prevState.selOptions, ...filteredOptions],
      options: value[0] ? value : [], // if 1st value is empty string, set to empty string
    }));
  };

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    let value = '';

    selectedItems.map((items) => {
      value += items.toString() + '|';
    });

    this.setState({options: [...selectedItems]});
    updateFieldsValue({
      rank: item.rank,
      value: item.type === 'selectmulti' ? value : selectedItems[0],
    });
  };

  render() {
    const {item, single = true} = this.props;
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
            single={single}
            selectText="Select from options"
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.options}
          />
        </View>
      </ItemWrapper>
    );
  }
}

const mapState = createStructuredSelector({
  projectValue: selectProjectValue,
});

export default connect(mapState, null)(Select);
