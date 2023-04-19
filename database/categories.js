import * as SQLite from "expo-sqlite"
import { DEFAULT_CATEGORIES } from "../config/consts"

const db = SQLite.openDatabase("app.db")

export const createCategories = async () => {

	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, description TEXT);",
		)
		DEFAULT_CATEGORIES.forEach((category) => {
			tx.executeSql(
				"INSERT INTO categories(title,description) SELECT ?, ? WHERE NOT EXISTS(SELECT 1 FROM categories WHERE title = ?);",
				[category.title, category.description, category.title],
			)
		})
	})
}

export const selectFromCategories = (successCallback) => {
	createCategories()

	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM categories",
			null,
			(txObj, resultSet) => {
				console.log(resultSet)
				successCallback(Object.values(resultSet.rows))
			},
			(txObj, error) => console.log(error)
		)
	})
}

export const storeCategories = (successCallback, params) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO categories (title, description) VALUES (" + params.map((el) => "?").join() + ");",
			params,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})

	selectFromExpenseTables(successCallback)
}

export const dropCategories = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE categories;",
			null,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => {
				console.log(error)
				return false
			}
		)
	})
}
