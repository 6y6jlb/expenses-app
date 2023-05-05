import * as SQLite from "expo-sqlite"
import { getWhereConditionsWithParams, removeFalsyValuesFromObject } from "../helpers/common"

class Database {
	constructor(dbName = "app.db") {
		this.name = dbName
		this.instance = SQLite.openDatabase(dbName)
	}

	async execute(sql, params = null) {
		return new Promise((resolve, reject) => {
			this.instance.transaction((tx) => {
				tx.executeSql(
					sql,
					params,
					(_, { rows }) => resolve(rows._array ?? rows),
					(_, error) => reject(error)
				)
			})
		})
	}

	async select(table, where) {
		let sql = `SELECT * FROM ${table}`
		let params = []

		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			sql += ` WHERE ${conditionsWithParams.conditions.join(" AND ")} ORDER BY id`
			params = conditionsWithParams.params
		}

		return await this.execute(sql, params)
	}

	async insert(table, data) {
		const clearedData = removeFalsyValuesFromObject(data)
		let keys = Object.keys(clearedData)
		let values = Object.values(clearedData)
		let placeholders = new Array(values.length).fill("?")
		let sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders.join(", ")})`

		return await this.execute(sql, values)
	}

	async update(table, data, where) {
		const clearedData = removeFalsyValuesFromObject(data)
		let set = Object.keys(clearedData).map((key) => `${key} = ?`)
		let params = Object.values(clearedData)

		let sql = `UPDATE ${table} SET ${set.join(", ")}`
		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			sql += ` WHERE ${conditionsWithParams.conditions.join(" AND ")}`
			params = conditionsWithParams.params
		}

		return await this.execute(sql, params)
	}

	async delete(table, where) {
		let sql = `DELETE FROM ${table}`
		let params = []

		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			sql += ` WHERE ${conditionsWithParams.conditions.join(" AND ")}`
			params = conditionsWithParams.params
		}

		return await this.execute(sql, params)
	}

	async drop(table) {
		if (table) {
			return await this.execute(`DROP TABLE IF EXISTS ${table}`)
		}
		throw new Error("No table name to deletion")
	}
}

export default new Database()
