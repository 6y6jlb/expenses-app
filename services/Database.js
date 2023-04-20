import * as SQLite from "expo-sqlite"

class Database {

	constructor() {
		this.instance = SQLite.openDatabase("app.db")
	}

	async execute(sql, params = null) {
		return new Promise((resolve, reject)=>{
			this.instance.transaction((tx) => {
				tx.executeSql(
					sql,
					params,
					(_, { rows }) => resolve(rows),
					(_, error) => reject(error)
				)
			})
		})
	}
}

export default new Database()
