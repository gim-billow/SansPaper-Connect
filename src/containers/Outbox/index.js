//library
import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Searchbar} from 'react-native-paper';
import memoize from 'memoize-one';

import {ListItem, Icon} from 'react-native-elements';
import {selectOutbox} from '@selector/form';
import {deleteOutboxForm} from '@store/forms';
import {goToDraftFormFieldsScreen} from '@store/navigate';
import ItemWrapper from '../../components/Fields/ItemWrapper';
import {filter, includes} from 'ramda';
import styles from './styles';
import {darkGrey} from '@styles/colors';

class Outbox extends React.Component {
  state = {
    searchKeyword: '',
    refresh: false,
  };

  keyExtractor = (item, index) => index?.toString();

  getFilteredFormlist = memoize((outbox, searchKeyword) => {
    return filter(
      (item) =>
        includes(
          searchKeyword?.toLowerCase(),
          item?.value?.name?.toLowerCase(),
        ),
      outbox,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  renderItem = ({item}) => {
    const {deleteOutboxForm} = this.props;
    const {id, value, status, createdAt, updatedAt} = item;
    console.log('item', item);
    const {name} = value;
    const createDate = new Date(createdAt);
    const updateDate = new Date(updatedAt);
    const createString = `Submit: ${createDate.toDateString()} ${createDate.toLocaleTimeString()}`;
    const updateString = `Update: ${updateDate.toDateString()} ${updateDate.toLocaleTimeString()}`;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => deleteOutboxForm(id)}>
          <Icon name="delete" color={darkGrey} />
        </TouchableOpacity>
        <ItemWrapper>
          <ListItem
            key={id}
            bottomDivider
            onPress={() => this.props.goToDraftFormFieldsScreen(id)}>
            <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
              <ListItem.Subtitle style={{fontSize: 10}}>
                {createString}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{fontSize: 10}}>
                {updateString}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text>{status}</Text>
            <ListItem.Chevron />
          </ListItem>
        </ItemWrapper>
      </View>
    );
  };

  render() {
    const {searchKeyword} = this.state;
    const {outbox} = this.props;
    const filteredOutbox = this.getFilteredFormlist(outbox, searchKeyword);

    return (
      <View style={styles.flex1}>
        <Searchbar
          placeholder="Search outbox"
          style={styles.searchbar}
          value={searchKeyword}
          onChangeText={this.handleOnChangeText}
          icon="search"
          clearIcon="clear"
        />
        {filteredOutbox && filteredOutbox.length > 0 ? (
          <FlatList
            style={styles.container}
            keyExtractor={this.keyExtractor}
            data={filteredOutbox}
            renderItem={this.renderItem}
            refreshing={this.state.refresh}
          />
        ) : searchKeyword === '' ? (
          <View style={styles.emptyContainer}>
            <Text>No submitted form </Text>
          </View>
        ) : (
          <Text>No results match your search criteria </Text>
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  outbox: selectOutbox,
});

export default connect(mapState, {
  goToDraftFormFieldsScreen,
  deleteOutboxForm,
})(Outbox);
