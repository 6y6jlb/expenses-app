import * as SQLite from "expo-sqlite"
import React, { useEffect, useState } from "react"
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Badge from "../../components/badge/Badge"
import { global } from "../../styles/styles"


import { dropExpenseTable } from "../../database/db"


export default function Main({ navigation }) {
	const [loading, setLoading] = useState(false)
	const [tables, setTables] = useState([])

  const db = SQLite.openDatabase("app.db")

	useEffect(() => {
		setLoading(true)

		db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, currency TEXT, payload TEXT);"
      )
    })
  
    selectTables(db)


		setLoading(false)
	}, [])

  const selectTables = (db) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM expense_tables",
        null,
        (txObj, resultSet) => {
          console.log(resultSet.rows)
          setTables(Object.values(resultSet.rows))
        },
        (txObj, error) => {
          console.log(error)
        }
      )
    })
  }

   const storeExpenseTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO expense_tables (name, currency, payload) VALUES ('leonidze expenses', 'USD','{test: test}');",
        null,
        (txObj, resultSet) => true,
        (txObj, error) => {
          console.log(error)
        }
      )
    })
    selectTables()
  }


	if (loading) {
		return (
			<View style={global.header}>
				<Text style={global.title}> ...Loading tables</Text>
			</View>
		)
	}

	return (
		<View style={global.header}>
			<Text style={global.title}>Main</Text>
			<FlatList
				data={tables}
				renderItem={({item}) => <TouchableOpacity onPress={()=>navigation.navigate('report',item)}><Badge title={item.name} /></TouchableOpacity>}
        keyExtractor={item => item.id}
			/>
			<Button
				title="add"
				onPress={() => {
					storeExpenseTable()
				}}
			/>
			<Button
				title="drop"
				onPress={() => {
					dropExpenseTable(db)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})
