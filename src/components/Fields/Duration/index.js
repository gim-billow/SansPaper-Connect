import React, {Component} from 'react';
import {TextInput} from 'react-native-paper';
import {Text, View} from 'react-native';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

class Duration extends Component {
  state = {
    hours: '',
    minutes: '',
  };

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
    const {item} = this.props;
    const {hours, minutes} = this.state;
    const keyboardType = this.props.keyboardType
      ? this.props.keyboardType
      : 'default';
    const {container, text, content} = styles;

    return (
      <ItemWrapper>
        <Text style={text}>{item.label}</Text>
        <View style={container}>
          <View style={content}>
            <TextInput
              style={styles.textInput}
              value={hours}
              label="Hours"
              mode="outlined"
              keyboardType={'numeric'}
              multiline={false}
              onChangeText={(number) => this.hoursChangeHandler(number)}
            />
          </View>
          <View style={styles.content}>
            <TextInput
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
      </ItemWrapper>
    );
  }
}

export default Duration;
