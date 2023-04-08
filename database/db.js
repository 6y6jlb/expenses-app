

export const createExpenseTables = (db) => {
	db.transaction((tx) => {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, currency TEXT, payload TEXT);"
		)
	})
}



export const dropExpenseTable = (db) => {
	db.transaction((tx) => {
		tx.executeSql(
			"DROP TABLE expense_tables;",
			null,
			(txObj, resultSet) => console.log(resultSet),
			(txObj, error) => {
				console.log(error)
			}
		)
	})
}
