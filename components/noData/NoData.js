import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../../i18n/configuration';

const NoData = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text ? props.text : i18n.t('no_data')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default NoData;