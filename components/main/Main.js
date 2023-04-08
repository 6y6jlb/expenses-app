import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { global } from '../../styles/styles';
import Badge from '../badge/Badge';


export default function Main({navigation}) {

    const [tables, setTables] = useState([
        {
            name: 'leonidze expenses', 
            data: {
                tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
                tableData: [
                  ['1', '2', '3', '4'],
                  ['a', 'b', 'c', 'd'],
                  ['1', '2', '3', '456\n789'],
                  ['a', 'b', 'c', 'd']
                ]
              }
        }
    ]);

  return (
    <View style={global.header}>
      <Text style={global.title}>Main</Text>
      <FlatList
        data={tables}
        renderItem={({item}) => <TouchableOpacity onPress={()=>navigation.navigate('report',item)}><Badge title={item.name} /></TouchableOpacity>}
        keyExtractor={item => item.name}
      />
          </View>
  )
}

const styles = StyleSheet.create({

  });