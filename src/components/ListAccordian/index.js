import React from 'react';
import {View, Text, LayoutAnimation, Platform, UIManager} from 'react-native';
import styles from './styles';

export default class ListAccordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = (payload) => {
    const {item, index} = payload;
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <Text style={styles.text}>{index + 1}.</Text>
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <View>
        <ListAccordian data={data} title={this.props.title} />
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}
