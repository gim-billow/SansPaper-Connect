import React from 'react';
import {StyleSheet, TouchableOpacity, View, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {offlineFormSync} from '@store/forms';
import {white} from '@styles/colors';

function SyncButton(props) {
  const onPressSyncForm = () => {
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

export default connect(null, {offlineFormSync})(SyncButton);
