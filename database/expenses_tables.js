import * as SQLite from "expo-sqlite"
import { DEFAULT_TABLE } from "../config/consts"

const db = SQLite.openDatabase("app.db")

export const createExpenseTables = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, currency TEXT);"
			),
				null,
				(txObj, resultSet) => resolve(resultSet.rows),
				(txObj, error) => reject(error)
		})
	})
}

export const selectFromExpenseTables = async () => {
	try {
		await createExpenseTables()
	} catch (error) {
		throw new Error("Create expenses_table, " + error.message)
	}
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM expense_tables")
			null, (txObj, resultSet) => resolve(resultSet.rows), (txObj, error) => reject(error)
		})
	})
}

export const storeExpenseTable = async (params) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO expense_tables (title, currency) VALUES (?,?);",
				[params.title, params.currency],
				(txObj, resultSet) => resolve(resultSet.rows),
				(txObj, error) => reject(error)
			)
		})
	})
}

export const updateExpenseTable = (params) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"UPDATE expense_tables SET title = ?, currency = ? WHERE id = ? ;",
				[params.title, params.currency, params.id],
				(txObj, resultSet) => resolve(resultSet.rows),
				(txObj, error) => reject(error)
			)
		})
	})
}

export const dropExpenseTable = async () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DROP TABLE IF EXISTS expense_tables;",
				null,
				(txObj, resultSet) => resolve(resultSet.rows),
				(txObj, error) => reject(error)
			)
		})
	})
}
