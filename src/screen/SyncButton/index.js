import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import {selectOfflineFeature, selectBetaAccess} from '@selector/user';
import {offlineFormSync} from '@store/forms';
import {white} from '@styles/colors';

function SyncButton(props) {
  const onPressSyncForm = () => {
    if (!props.offlineFeature && !props.betaAccess) {
      Alert.alert('', 'This feature is currently unavailable');
      return;
    }

    props.offlineFormSync();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressSyncForm}>
        <Icon name="sync" color={white} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  icon: {
    paddingRight: Platform.OS === 'android' ? 20 : 0,
  },
});

const mapState = createStructuredSelector({
  offlineFeature: selectOfflineFeature,
  betaAccess: selectBetaAccess,
});

export default connect(mapState, {offlineFormSync})(SyncButton);
