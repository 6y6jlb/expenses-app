import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("app.db")

export const createExpenseTableCategories = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS expense_table_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL," +
				"FOREIGN KEY (expenses_table_id)REFERENCES expenses_tables (id), FOREIGN KEY (category_id)REFERENCES categories (id));"
		)
	})
}

export const selectFromExpenseTablesCategories = (successCallback) => {
	createExpenseTables()

	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM expense_table_categories",
			null,
			(txObj, resultSet) => {
				successCallback(Object.values(resultSet.rows))
			},
			(txObj, error) => console.log(error)
		)
	})
}

export const storeExpenseTableCategories = (successCallback, params) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO expense_table_categories (category_id, expenses_table_id) VALUES (?,?);",
			params,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})

	selectFromExpenseTables(successCallback)
}

export const dropExpenseTableCategories = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE expense_table_categories;",
			null,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => {
				console.log(error)
				return false
			}
		)
	})
}
