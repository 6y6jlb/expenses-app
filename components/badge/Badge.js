import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Badge({title, color}) {
    return (
    <View style={[styles.item, {backgroundColor: color}]}>
      <Text style={styles.title}>{title}</Text>
    </View>
    )
  }

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 10
  },
  title: {
    fontSize: 32,
  },
})