import React, {Component} from 'react';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {Text, View} from 'react-native';

import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import styles from './styles';
import {commonStyles} from '@styles/common';

class Duration extends Component {
  state = {
    hours: '',
    minutes: '',
  };

  componentDidMount() {
    const {value} = this.props.item;

    if (value) {
      this.convertWorkHours(value);
    }
  }

  convertWorkHours(value) {
    value = Number(value);
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    this.hoursChangeHandler(hours + '');
    this.minutesChangeHandler(minutes + '');
  }

  hoursChangeHandler(value) {
    this.setState({hours: value});
    this.ComputeWorkHours(value, this.state.minutes);
  }

  minutesChangeHandler(value) {
    this.setState({minutes: value});
    this.ComputeWorkHours(this.state.hours, value);
  }

  ComputeWorkHours(hrs, mins) {
    const {item, updateFieldsValue} = this.props;
    const total = Number(hrs) * 60 + Number(mins);
    updateFieldsValue({rank: item.rank, value: total.toString()});
  }

  render() {
    const {item, isEditable} = this.props;
    const {hours, minutes} = this.state;
    // const keyboardType = this.props.keyboardType
    //   ? this.props.keyboardType
    //   : 'default';

    return (
      <ItemWrapper>
        <View style={styles.topContainer}>
          <Text style={commonStyles.text}>{item.label}</Text>
          {item.mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View style={styles.container}>
            <View style={styles.content}>
              <TextInput
                disabled={!isEditable}
                style={[styles.textInput, styles.left]}
                value={hours}
                label="Hours"
                mode="outlined"
                keyboardType={'numeric'}
                multiline={false}
                onChangeText={(number) => this.hoursChangeHandler(number)}
              />
            </View>
            <View style={[styles.content, styles.right]}>
              <TextInput
                disabled={!isEditable}
                style={styles.textInput}
                value={minutes}
                label="Minutes"
                mode="outlined"
                keyboardType={'numeric'}
                multiline={false}
                onChangeText={(number) => this.minutesChangeHandler(number)}
              />
            </View>
          </View>
        </View>
        <Divider />
      </ItemWrapper>
    );
  }
}

export default Duration;
