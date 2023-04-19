import * as SQLite from "expo-sqlite"
import { DEFAULT_TABLE } from "../config/consts"

const db = SQLite.openDatabase("app.db")

export const createExpenseTables = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, currency TEXT);"
		)
	})
}

export const selectFromExpenseTables = (successCallback, errorCallack) => {
	createExpenseTables()

	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM expense_tables",
			null,
			(txObj, resultSet) => {
				if (!Object.values(resultSet.rows).length) {
					console.log(resultSet)
					storeExpenseTable(Object.values(DEFAULT_TABLE))
					selectFromExpenseTables(successCallback, errorCallack)
				} else {
					successCallback(Object.values(resultSet.rows))
				}
			},
			(txObj, error) => errorCallack(error)
		)
	})
}

export const storeExpenseTable = (params) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO expense_tables (title, currency) VALUES (?,?);",
			params,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})
}

export const updateExpenseTable = (params) => {
	db.transaction((tx) => {
		tx.executeSql(
			"UPDATE expense_tables SET title = ?, currency = ? WHERE id = ? ;",
			[params.title, params.currency, params.id],
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})
}

export const dropExpenseTable = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE expense_tables;",
			null,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})
}
