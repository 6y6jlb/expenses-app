import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoData = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text ? props.text : "No data to"}</Text>
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