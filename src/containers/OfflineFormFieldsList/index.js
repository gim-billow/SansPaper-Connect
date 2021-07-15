//library
import React from 'react';
import {View, Platform, Text} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {has, find, propEq} from 'ramda';

//component
import Fields from 'components/Fields';

//redux,selector
import {goToGoogleMapScreen} from '@store/navigate';
import {
  updateOfflineFormFieldValue,
  resetCurrentForm,
  updateSubmittingForm,
} from 'store/forms';
import {
  selectOfflineCurrentFormId,
  selectOfflineCurrentFormFields,
  selectScrollToMandatory,
  selectSubmitTriggered,
  selectIsDraftForm,
  selectOutbox,
} from 'selector/form';
import {selectNetworkInfo} from '@selector/common';
import {selectOrganistation} from 'selector/sanspaper';

//constants
import {fieldsProps} from './helper';
import styles from './styles';

class FormFieldsList extends React.Component {
  state = {
    expanded: false,
    scrollEnabled: true,
    fieldsValue: {},
  };

  componentDidMount() {
    this.props.resetCurrentForm();
  }

  componentDidUpdate(prevProps) {
    const {submitTriggered, scrollToMandatory} = this.props;
    if (prevProps.submitTriggered !== submitTriggered && scrollToMandatory) {
      const index =
        scrollToMandatory === 1 ? scrollToMandatory - 1 : scrollToMandatory;
      this.scrollToIndex(index);
    }
  }

  componentWillUnmount() {
    this.props.updateSubmittingForm(false);
  }

  keyExtractor = (item, index) => index.toString();

  onPress = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  };

  updateScrollEnabled = (status) => {
    this.setState({scrollEnabled: status});
  };

  isEditable = () => {
    const {outbox, draftId} = this.props;
    const found = find(propEq('id', draftId))(outbox);

    if (found && found.status === 'submitted') {
      return false;
    }
    return true;
  };

  renderItem = (props) => {
    const {item} = props;
    const {
      updateOfflineFormFieldValue,
      organization,
      currentFormFields,
      goToGoogleMapScreen,
      draftId,
      screen,
      networkInfo,
    } = this.props;

    if (has(item.type, Fields)) {
      if (!item.hidden) {
        const FormFields = Fields[item.type];
        const FieldElement = React.createElement(FormFields, {
          offline: true,
          formId: item.formid,
          item: item,
          isEditable: screen === 'outbox' ? this.isEditable() : true,
          updateFieldsValue: updateOfflineFormFieldValue,
          organization,
          currentFormFields,
          draftId,
          isInternetReachable: networkInfo.isInternetReachable,
          updateScrollEnabled: this.updateScrollEnabled,
          ...fieldsProps[item.type],
          goToGoogleMapScreen,
        });
        return FieldElement;
      }
    } else {
      return (
        <ListItem key={item.id} bottomDivider>
          <Icon name="file-text-o" type="font-awesome" />
          <ListItem.Content>
            <ListItem.Title>{item.label}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    }
  };

  scrollToIndex = (index) => {
    this.flatListRef.scrollToIndex({animated: true, index});
  };

  render() {
    const {currentFormFields, networkInfo} = this.props;
    const {scrollEnabled} = this.state;

    return (
      <>
        {!networkInfo.isInternetReachable ? (
          <View style={styles.offline}>
            <Text style={styles.offlineText}>Currently in offline mode</Text>
          </View>
        ) : null}
        <View
          style={[
            styles.container,
            !networkInfo.isInternetReachable ? {paddingTop: 30} : null,
          ]}>
          <KeyboardAwareFlatList
            innerRef={(ref) => {
              this.flatListRef = ref;
            }}
            keyExtractor={this.keyExtractor}
            data={currentFormFields}
            showsVerticalScrollIndicator={false}
            initialNumToRender={500}
            renderItem={this.renderItem}
            scrollEnabled={scrollEnabled}
            removeClippedSubviews={false}
            extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
            enableOnAndroid={true}
            enableResetScrollToCoords={false}
          />
        </View>
      </>
    );
  }
}

const mapState = createStructuredSelector({
  currentFormId: selectOfflineCurrentFormId,
  outbox: selectOutbox,
  currentFormFields: selectOfflineCurrentFormFields,
  scrollToMandatory: selectScrollToMandatory,
  submitTriggered: selectSubmitTriggered,
  organization: selectOrganistation,
  draftId: selectIsDraftForm,
  networkInfo: selectNetworkInfo,
});

export default connect(mapState, {
  updateOfflineFormFieldValue,
  goToGoogleMapScreen,
  resetCurrentForm,
  updateSubmittingForm,
})(FormFieldsList);
