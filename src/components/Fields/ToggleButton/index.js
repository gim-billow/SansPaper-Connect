/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import MandatoryField from '../MandatoryField';
import {Text, View, TouchableOpacity} from 'react-native';
import {map, split} from 'ramda';

//styles
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

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
  const {item, id, updateFieldsValue} = props;
  const {label, seloptions, rank, mandatory} = item;

  const options = map((option) => {
    return split(':', option)[1]
      ? split(':', option)[1]
      : split(':', option)[0];
  }, split('|', seloptions));

  let dataOptions = map((option) => {
    return {
      id: split(':', option)[0],
      name: split(':', option)[1]
        ? split(':', option)[1]
        : split(':', option)[0],
    };
  }, split('|', seloptions));

  const [selected, setOption] = React.useState(options[0]);
  const isSelected = (option) => {
    return option === selected;
  };

  React.useEffect(() => {
    updateFieldsValue({rank: rank, value: dataOptions[0].id});
  }, []);

  const onPress = (option) => {
    const value = dataOptions.filter((item) => {
      return item.name === option;
    });
    setOption(option);
    updateFieldsValue({rank: rank, value: value[0].id});
  };
  return (
    <ItemWrapper>
      <Text style={styles.label}>{label}</Text>
      {mandatory === 1 ? <MandatoryField /> : null}
      <View style={styles.container}>
        {map((option) => {
          let colorControl = _mapToColour(option.id);
          const isSelectedOption = isSelected(option.name);
          return (
            <TouchableOpacity
              key={id}
              style={[
                colorControl.button,
                isSelectedOption
                  ? colorControl.background
                  : styles.whiteBackground,
              ]}
              onPress={() => onPress(option.name)}>
              <Text
                style={[
                  styles.text,
                  isSelectedOption ? styles.whiteColor : colorControl.text,
                ]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          );
        }, dataOptions)}
      </View>
    </ItemWrapper>
  );
};

export default ToggleButton;
