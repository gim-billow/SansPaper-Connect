import React from 'react';
import {Text, View} from 'react-native';
// import {TabView, TabBar} from 'react-native-tab-view';
import analytics from '@react-native-firebase/analytics';
import {SearchBar} from 'react-native-elements';
import memoize from 'memoize-one';
import {connect} from 'react-redux';
import R from 'ramda';
import {createStructuredSelector} from 'reselect';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import styles from './styles';
import {veryLightGrey} from '@styles/colors';
import FormList from '@containers/FormList';
import OfflineFormList from '@containers/OfflineFormList';
import {searchBarStyle} from '@styles/common';
import {activeScreen} from '@store/common';
import {selectSortedFormList, selectOfflineFormList} from '@selector/form';
import {selectNetworkInfo} from '@selector/common';
class FormScreen extends NavigationComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: '',
    };

    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    Navigation.events().registerComponentDidAppearListener(
      async ({componentName, componentType}) => {
        if (componentType === 'Component') {
          await analytics().logScreenView({
            screen_name: componentName,
            screen_class: componentName,
          });
        }
      },
    );
  }

  getFilteredFormlist = memoize((forms, keyword) => {
    return R.filter(
      (form) => R.includes(keyword?.toLowerCase(), form?.name?.toLowerCase()),
      forms,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  render() {
    const {searchKeyword} = this.state;
    const {networkInfo} = this.props;

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
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
        <View style={{flex: 1}}>
          <View style={styles.subHeader}>
            <Text style={styles.subHederText}>
              {networkInfo.isInternetReachable ? 'Online' : 'Offline'}
            </Text>
          </View>
          {networkInfo.isInternetReachable ? (
            <FormList
              searchKeyword={this.state.searchKeyword}
              filteredFromList={this.getFilteredFormlist(
                this.props.formList,
                this.state.searchKeyword,
              )}
            />
          ) : (
            <OfflineFormList
              searchKeyword={this.state.searchKeyword}
              filteredFromList={this.getFilteredFormlist(
                this.props.offlineFormList,
                this.state.searchKeyword,
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  formList: selectSortedFormList,
  offlineFormList: selectOfflineFormList,
  networkInfo: selectNetworkInfo,
});

export default connect(mapState, {activeScreen})(FormScreen);
