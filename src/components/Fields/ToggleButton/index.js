/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {map, split, find, propEq} from 'ramda';

import {commonStyles} from '@styles/common';
import {red} from '@styles/colors';
import {uniqueKey} from '@util/general';
import MandatoryField from '../MandatoryField';
import styles from './styles';

const _mapToColour = (id) => {
  if (id === '0') {
    return {
      text: styles.redColor,
      background: styles.redBackground,
      button: styles.redButton,
    };
  } else if (id === '1') {
    return {
      text: styles.greenColor,
      background: styles.greenBackground,
      button: styles.greenButton,
    };
  } else if (id === '2') {
    return {
      text: styles.orangeColor,
      background: styles.orangeBackground,
      button: styles.orangeButton,
    };
  } else if (id >= '3') {
    return {
      text: styles.blueColor,
      background: styles.blueBackground,
      button: styles.blueButton,
    };
  } else {
    return {
      text: styles.blueColor,
      background: styles.blueBackground,
      button: styles.blueButton,
    };
  }
};

const ToggleButton = (props) => {
  const [selected, setOption] = useState();
  const {
    item,
    id,
    updateFieldsValue,
    isEditable,
    draftFormHasChanges,
    draftId,
  } = props;
  const {label, seloptions, rank, mandatory} = item;

  let dataOptions = map((option) => {
    return {
      id: split(':', option)[0],
      name: split(':', option)[1]
        ? split(':', option)[1]
        : split(':', option)[0],
    };
  }, split('|', seloptions));

  const isSelected = (option) => {
    return option === selected;
  };

  useEffect(() => {
    const {value} = props.item;

    if (value !== '' && value !== '-1') {
      const defaultVal = find(propEq('id', value))(dataOptions);
      setOption(defaultVal?.name);
      updateFieldsValue({rank: rank, value: value});
      return;
    }

    updateFieldsValue({rank: rank, value: ''});
  }, []);

  const onPress = (option) => {
    const value = dataOptions.filter((item) => {
      return item.name === option;
    });
    setOption(option);

    if (draftId) draftFormHasChanges(true);
    updateFieldsValue({rank: rank, value: value[0].id});
  };

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.container}>
          {map((option) => {
            let colorControl = _mapToColour(option.id);
            const isSelectedOption = isSelected(option.name);

            return (
              <TouchableOpacity
                disabled={!isEditable}
                key={uniqueKey()}
                style={[
                  colorControl.button,
                  isSelectedOption ? colorControl.background : null,
                ]}
                onPress={() => onPress(option.name)}>
                {colorControl.background.backgroundColor === red ? (
                  !isSelectedOption ? (
                    <View style={styles.btn}>
                      <Icon
                        name="exclamation-circle"
                        type="font-awesome"
                        color={red}
                        size={15}
                      />
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={
                          isSelectedOption
                            ? [styles.whiteColor, styles.selectedText]
                            : [styles.text, colorControl.text]
                        }>
                        {option.name}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.btn}>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={
                          isSelectedOption
                            ? [styles.whiteColor, styles.selectedText]
                            : [styles.text, colorControl.text]
                        }>
                        {option.name}
                      </Text>
                    </View>
                  )
                ) : (
                  <View style={styles.btn}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={
                        isSelectedOption
                          ? [styles.whiteColor, styles.selectedText]
                          : [styles.text, colorControl.text]
                      }>
                      {option.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }, dataOptions)}
        </View>
      </View>
    </>
  );
};

export default ToggleButton;
