import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

export default ({data}) => {

  return (
    <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={data.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={data.tableData} textStyle={styles.text}/>
        </Table>
      </View>
  )
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });