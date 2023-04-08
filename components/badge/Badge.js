import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Badge({title}) {
    return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
    )
  }

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})