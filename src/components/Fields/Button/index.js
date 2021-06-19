import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Button as RNButton} from 'react-native-elements';
import {commonStyles} from '@styles/common';
import styles from './styles';

const Button = (props) => {
  const {item, isEditable} = props;

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{item.label}</Text>
        <View style={styles.button}>
          <RNButton
            disabled={!isEditable && item.label.includes('new') ? true : false}
            disabledTitleStyle={styles.disableText}
            disabledStyle={styles.disable}
            title={item.label}
            titleStyle={styles.title}
            buttonStyle={styles.container}
            onPress={() => {}}
          />
        </View>
      </View>
    </>
  );
};

export default memo(Button);
