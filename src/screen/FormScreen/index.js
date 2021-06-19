//library
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {SearchBar} from 'react-native-elements';
import memoize from 'memoize-one';
import {connect} from 'react-redux';
import R from 'ramda';
import {createStructuredSelector} from 'reselect';

import styles from './styles';
import {red, white, veryLightGrey, lightRed} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';
import {searchBarStyle} from '@styles/common';
import {selectSortedFormList, selectOfflineFormList} from '@selector/form';

const width = Dimensions.get('window').width;
class FormScreen extends React.Component {
  state = {
    index: 0,
    searchKeyword: '',
    routes: [
      {key: 'first', title: 'Online'},
      {key: 'second', title: 'Offline'},
    ],
  };
  // const [index, setIndex] = React.useState(0);
  // const [searchKeyword, setSearchKeyword] = React.useState('');
  // const [routes] = React.useState([
  //   {key: 'first', title: 'Online'},
  //   {key: 'second', title: 'Offline'},
  // ]);

  getFilteredFormlist = memoize((forms, keyword) => {
    return R.filter(
      (form) => R.includes(keyword?.toLowerCase(), form?.name?.toLowerCase()),
      forms,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return (
          <FormList
            searchKeyword={this.state.searchKeyword}
            filteredFromList={this.getFilteredFormlist(
              this.props.formList,
              this.state.searchKeyword,
            )}
          />
        );
      case 'second':
        return (
          <OfflineFormList
            searchKeyword={this.state.searchKeyword}
            filteredFromList={this.getFilteredFormlist(
              this.props.offlineFormList,
              this.state.searchKeyword,
            )}
          />
        );
      default:
        return null;
    }
  };

  renderTabBar = (prop) => (
    <TabBar
      {...prop}
      activeColor={white}
      inactiveColor={lightRed}
      renderLabel={({route, color}) => (
        <Text style={[styles.tabText, {color}]}>{route.title}</Text>
      )}
      indicatorStyle={{opacity: 0}}
      style={styles.tabBar}
      tabStyle={styles.tab}
    />
  );

  render() {
    const {index, routes, searchKeyword} = this.state;

    return (
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forms</Text>
          <SearchBar
            placeholder="Search form"
            containerStyle={searchBarStyle.searchContainer}
            inputContainerStyle={searchBarStyle.searchInputContainer}
            inputStyle={searchBarStyle.searchInput}
            searchIcon={{
              color: veryLightGrey,
            }}
            selectionColor={veryLightGrey}
            placeholderTextColor={veryLightGrey}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            clearIcon={{
              color: veryLightGrey,
            }}
          />
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={(idx) => this.setState({index: idx})}
          initialLayout={{width}}
          sceneContainerStyle={styles.container}
        />
      </>
    );
  }
}

FormScreen.options = {
  statusBar: {
    visible: true,
    backgroundColor: red,
    styles: 'light',
  },
  topBar: {
    visible: true,
  },
};

const mapState = createStructuredSelector({
  formList: selectSortedFormList,
  offlineFormList: selectOfflineFormList,
});

export default connect(mapState, null)(FormScreen);
