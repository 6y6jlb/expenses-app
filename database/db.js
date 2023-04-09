import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("app.db")

export const createExpenseTables = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, currency TEXT, description TEXT);"
		)
	});

}

export const selectFromExpenseTables = (successCallback) => {
    createExpenseTables()
	
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM expense_tables",
			null,
			(txObj, resultSet) => {
				successCallback(Object.values(resultSet.rows))
			},
			(txObj, error) => console.log(error)
		)
	})
}

export const storeExpenseTable = (successCallback, params) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO expense_tables (name, currency, description) VALUES ("+params.map(el=>'?').join()+");",
			params,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => console.log(error)
		)
	})

    selectFromExpenseTables(successCallback)
    
}

export const dropExpenseTable = () => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE expense_tables;",
			null,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => {
				console.log(error)
				return false
			}
		)
	})
}
