import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import R from 'ramda';

import styles from './styles';
import MandatoryField from '../MandatoryField';
import {getQueryByOptions, getOptionsFromDB} from './helper';
import {selectProjectValue, selectOfflineProjectValue} from 'selector/form';
import {commonStyles} from '@styles/common';
import {projectDependant} from '@store/forms';

class Select extends PureComponent {
  state = {
    options: [],
    selOptions: [],
  };

  async componentDidMount() {
    let selected = [];
    const {seloptions, type, value} = this.props.item;

    if (value !== '' && type !== 'user') {
      selected = R.split('|', value);
    }

    if (type === 'user') {
      selected = [value];
    }

    const {
      organization,
      projectValue,
      offlineProjectValue,
      offline = false,
      formId,
    } = this.props;
    let options = [];
    if (offline) {
      let projectVal = '';

      for (const project of projectDependant) {
        if (R.includes(project, seloptions)) {
          projectVal = offlineProjectValue;
        }
      }

      const params = {
        formId,
        seloptions,
        type,
        projectValue: projectVal,
      };

      options = await getOptionsFromDB(params);
    } else {
      options = await getQueryByOptions(
        seloptions,
        type,
        organization,
        projectValue,
      );
    }

    this.updateSetOptions(options, selected);
  }

  async componentDidUpdate(prevProps) {
    const {
      item,
      organization,
      projectValue,
      offlineProjectValue,
      offline = false,
      formId,
      draftFormHasChanges,
      draftId,
    } = this.props;

    if (offline) {
      if (prevProps.offlineProjectValue !== offlineProjectValue) {
        if (item.seloptions.includes('projects.milestones')) {
          this.resetSelOptions();

          const params = {
            formId,
            seloptions: item.seloptions,
            type: item.type,
            projectValue: offlineProjectValue,
          };

          const options = await getOptionsFromDB(params);

          if (draftId) draftFormHasChanges(true);
          this.updateSetOptions(options, [item.value]);
        }
      }
    } else {
      if (prevProps.projectValue !== projectValue) {
        if (item.seloptions.includes('projects.milestones')) {
          this.resetSelOptions();

          const option = `=Query.options('projects.milestones', "projectid='${projectValue}'")`;

          const options = await getQueryByOptions(
            option,
            item.type,
            organization,
            projectValue,
          );

          this.updateSetOptions(options, [item.value]);
          return;
        }
      }
    }
  }

  resetSelOptions = () => {
    this.setState({
      selOptions: [],
    });
  };

  updateSetOptions = (options, value) => {
    const filteredOptions = R.pipe(
      R.sortBy(R.compose(R.toLower, R.prop('name'))),
      R.filter((option) => !R.isNil(option)),
    )(options);

    this.setState({selOptions: [...filteredOptions], options: value});
  };

  onSelectedItemsChange = (selectedItems) => {
    const {item, updateFieldsValue} = this.props;
    let value = '';

    // if single, remove the selected option
    if (
      item.type !== 'selectmulti' &&
      selectedItems[0] === this.state.options[0]
    ) {
      this.setState({options: []});
      updateFieldsValue({
        rank: item.rank,
        value: '',
      });

      return;
    }

    selectedItems.map((selected, index) => {
      let addedItem = null;
      if (index === 0) {
        addedItem = selected;
      } else {
        addedItem = !value ? selected : `|${selected}`;
      }
      value += addedItem;
    });

    this.setState({options: R.filter((x) => x !== '', selectedItems)});

    updateFieldsValue({
      rank: item.rank,
      value: item.type === 'selectmulti' ? value : selectedItems[0],
    });
  };

  render() {
    const {item, single = true, isEditable} = this.props;
    const {selOptions} = this.state;
    const {
      container,
      selectToggle,
      button,
      itemText,
      chipsWrapper,
      searchBar,
      confirmText,
      selectToggleText,
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
              items={selOptions}
              IconRenderer={Icon}
              showCancelButton
              uniqueKey="id"
              single={single}
              selectText="Search from items"
              searchPlaceholderText="Search from items"
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={this.state.options}
              hideChipRemove={!isEditable}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapState = createStructuredSelector({
  projectValue: selectProjectValue,
  offlineProjectValue: selectOfflineProjectValue,
});

export default connect(mapState)(Select);
