import React from 'react'
import { View, Text } from 'react-native'
import Report from '../../components/report/Report'
import { global } from '../../styles/styles'

export default function ReportContainer ({route}) {
  console.log(route.params)
  return (
    <View>
      <Text style={global.title}>{route.params.name}</Text>
      <Report data={route.params.data}/>
    </View>
  )
}
