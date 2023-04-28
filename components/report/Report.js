import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, Rows, Table, TableWrapper, Cell } from 'react-native-table-component';


export default ({data}) => {

  return (
    <View>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={data.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            data.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
  )
}


const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  });