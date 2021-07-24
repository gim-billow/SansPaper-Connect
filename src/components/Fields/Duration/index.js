import React, {Component} from 'react';
import {Input} from 'react-native-elements';
import {Text, View} from 'react-native';

import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';
import {darkGrey, lightGrey} from '@styles/colors';

class Duration extends Component {
  state = {
    hours: '',
    minutes: '',
  };

  componentDidMount() {
    const {value} = this.props.item;

    if (value) {
      this.convertWorkHours(value, true);
    }
  }

  convertWorkHours(value, hasVal) {
    value = Number(value);
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    this.hoursChangeHandler(hours + '', hasVal);
    this.minutesChangeHandler(minutes + '', hasVal);
  }

  hoursChangeHandler(value, hasVal) {
    this.setState({hours: value});
    this.ComputeWorkHours(value, this.state.minutes, hasVal);
  }

  minutesChangeHandler(value, hasVal) {
    this.setState({minutes: value});
    this.ComputeWorkHours(this.state.hours, value, hasVal);
  }

  ComputeWorkHours(hrs, mins, hasValue = null) {
    const {item, updateFieldsValue, draftFormHasChanges, draftId} = this.props;
    const total = Number(hrs) * 60 + Number(mins);

    if (!hasValue && draftId) {
      draftFormHasChanges(true);
    }
    updateFieldsValue({rank: item.rank, value: total.toString()});
  }

  render() {
    const {item, isEditable} = this.props;
    const {hours, minutes} = this.state;
    // const keyboardType = this.props.keyboardType
    //   ? this.props.keyboardType
    //   : 'default';

    return (
      <>
        <View style={styles.topContainer}>
          <Text style={commonStyles.title}>{item.label}</Text>
          {item.mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Input
                disabled={!isEditable}
                style={styles.textInput}
                value={hours.toString()}
                containerStyle={styles.input}
                placeholder="Hours"
                placeholderTextColor={lightGrey}
                selectionColor={darkGrey}
                keyboardType="numeric"
                multiline={false}
                onChangeText={(number) => this.hoursChangeHandler(number)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                disabled={!isEditable}
                style={styles.textInput}
                value={minutes.toString()}
                containerStyle={styles.input}
                placeholder="Minutes"
                placeholderTextColor={lightGrey}
                selectionColor={darkGrey}
                keyboardType="numeric"
                multiline={false}
                onChangeText={(number) => this.minutesChangeHandler(number)}
              />
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default Duration;
