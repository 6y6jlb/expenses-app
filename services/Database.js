import * as SQLite from "expo-sqlite"

class Database {
	constructor(dbName = "app.db") {
		this.instance = SQLite.openDatabase(dbName)
	}

	async execute(sql, params = null) {
		return new Promise((resolve, reject) => {
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

	async select(table, where) {
		let sql = `SELECT * FROM ${table}`
		let params = []

		if (where) {
			let conditions = Object.keys(where).map((key) => `${key} = ?`)
			sql += ` WHERE ${conditions.join(" AND ")}`
			params = Object.values(where)
		}

		return await this.execute(sql, params)
	}

	async insert(table, data) {
		let keys = Object.keys(data)
		let values = Object.values(data)
		let placeholders = new Array(values.length).fill("?")
		let sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`

		return await this.execute(sql, values)
	}

	async update(table, data, where) {
		let set = Object.keys(data).map((key) => `${key} = ?`)
		let params = Object.values(data)

		let sql = `UPDATE ${table} SET ${set.join(", ")}`
		if (where) {
			let conditions = Object.keys(where).map((key) => `${key} = ?`)
			sql += ` WHERE ${conditions.join(" AND ")}`
			params.push(...Object.values(where))
		}

		return await this.execute(sql, params)
	}

	async delete(table, where) {
		let sql = `DELETE FROM ${table}`
		let params = []

		if (where) {
			let conditions = Object.keys(where).map((key) => `${key} = ?`)
			sql += ` WHERE ${conditions.join(" AND ")}`
			params = Object.values(where)
		}

		return await this.execute(sql, params)
	}

	 async drop(table) {
		return await this.execute(`DROP TABLE IF EXISTS ${table}`)
	 }
}

export default new Database()
