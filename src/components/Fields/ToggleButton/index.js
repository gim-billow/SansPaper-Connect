/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {map, split} from 'ramda';

//styles
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const ToggleButton = (props) => {
  const {item, id, updateFieldsValue} = props;
  const {label, seloptions, rank} = item;
  const options = map((option) => {
    return split(':', option)[1];
  }, split('|', seloptions));

  const [selected, setOption] = React.useState(options[0]);
  const isSelected = (option) => {
    return option === selected;
  };

  React.useEffect(() => {
    updateFieldsValue({rank: rank, value: options[0]});
  }, []);

  const onPress = (option) => {
    setOption(option);
    updateFieldsValue({rank: rank, value: option});
  };
  return (
    <ItemWrapper>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {map((option) => {
          const isSelectedOption = isSelected(option);
          return (
            <TouchableOpacity
              key={id}
              style={[
                styles.button,
                isSelectedOption
                  ? styles.redBackground
                  : styles.whiteBackground,
              ]}
              onPress={() => onPress(option)}>
              <Text
                style={[
                  styles.text,
                  isSelectedOption ? styles.whiteColor : styles.redColor,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        }, options)}
      </View>
    </ItemWrapper>
  );
};

export default ToggleButton;
