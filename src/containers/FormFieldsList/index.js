//library
import React from 'react';
import {View, Platform} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {goToGoogleMapScreen} from '@store/navigate';
import {has} from 'ramda';

//component
import Fields from 'components/Fields';

//redux,selector
import {
  setCurrentForm,
  updateFormFieldValue,
  resetCurrentFormDetails,
} from 'store/forms';
import {
  selectCurrentFormId,
  selectCurrentFormFields,
  selectScrollToMandatory,
  selectSubmitTriggered,
  selectCurrentFormUnfillMandatoryFields,
} from 'selector/form';
import {selectOrganistation} from 'selector/sanspaper';

//constants
import {fieldsProps} from './helper';
import styles from '../../components/Fields/ItemWrapper/styles';

class FormFieldsList extends React.Component {
  state = {
    expanded: false,
    scrollEnabled: true,
    fieldsValue: {},
  };

  componentDidUpdate(prevProps) {
    const {submitTriggered, scrollToMandatory} = this.props;
    if (prevProps.submitTriggered !== submitTriggered && scrollToMandatory) {
      const index =
        scrollToMandatory === 1 ? scrollToMandatory - 1 : scrollToMandatory;
      this.scrollToIndex(index);
    }
  }

  componentWillUnmount() {
    this.props.resetCurrentFormDetails();
  }

  keyExtractor = (item, index) => index.toString();

  onPress = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  };

  updateScrollEnabled = (status) => {
    this.setState({scrollEnabled: status});
  };

  renderItem = (props) => {
    const {item} = props;
    const {
      updateFormFieldValue: updatedFormFieldProps,
      organization,
      currentFormFields,
      goToGoogleMapScreen,
    } = this.props;

    if (has(item.type, Fields)) {
      if (!item.hidden) {
        const FormFields = Fields[item.type];
        const FieldElement = React.createElement(FormFields, {
          item: item,
          updateFieldsValue: updatedFormFieldProps,
          organization,
          currentFormFields,
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
    const {currentFormFields, test} = this.props;
    const {scrollEnabled} = this.state;

    return (
      <View style={styles.flex1}>
        <KeyboardAwareFlatList
          innerRef={(ref) => {
            this.flatListRef = ref;
          }}
          keyExtractor={this.keyExtractor}
          data={currentFormFields}
          renderItem={this.renderItem}
          scrollEnabled={scrollEnabled}
          removeClippedSubviews={false}
          extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
          enableOnAndroid={true}
          enableResetScrollToCoords={true}
        />
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  currentFormId: selectCurrentFormId,
  currentFormFields: selectCurrentFormFields,
  scrollToMandatory: selectScrollToMandatory,
  submitTriggered: selectSubmitTriggered,
  organization: selectOrganistation,
  test: selectCurrentFormUnfillMandatoryFields,
});

export default connect(mapState, {
  setCurrentForm,
  updateFormFieldValue,
  resetCurrentFormDetails,
  goToGoogleMapScreen,
})(FormFieldsList);
