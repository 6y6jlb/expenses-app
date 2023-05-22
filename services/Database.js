import * as SQLite from "expo-sqlite"
import { getWhereConditionsWithParams, removeFalsyValuesFromObject } from "../helpers/common"
import { DBDto } from "./dto/DBDto"

class Database {
	constructor(dbName = "app.db") {
		this.name = dbName
		this.instance = SQLite.openDatabase(dbName)
	}

	/**
	 * @param {string} sql 
	 * @param {Array<string>|null} params 
	 * @returns {Promise}
	 */
	async execute(sql, params) {
		
		return new Promise((resolve, reject) => {
			let successCallback = (_, { rows }) => {
				resolve(Array.from(rows._array ?? rows))
				
			}
			if(sql.toLowerCase().includes('insert')) {
				successCallback = (_, { insertId }) => {
					resolve(insertId)
					
				}
			}
			this.instance.transaction((tx) => {
				tx.executeSql(
					sql,
					params,
					successCallback,
					(_, error) => reject(error)
				)
			})
		})
	}

	/**
	 * @param {string} table 
	 * @param {Array<string>|null} where 
	 * @returns {void}
	 */
	async select(table, where) {
		const dto = new DBDto()
		dto.select = `SELECT * FROM ${table}`
		let params = []

		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			dto.where = `WHERE ${conditionsWithParams.conditions.join(" AND ")}`
			dto.order = "ORDER BY id"
			params = conditionsWithParams.params
		}

		return await this.execute(dto.selectSqlStatement(), params)
	}

	/**
	 * @param {string} table 
	 * @param {Array<string>|null} data 
	 */
	async insert(table, data) {
		const dto = new DBDto()
		const clearedData = removeFalsyValuesFromObject(data)
		let keys = Object.keys(clearedData)
		let values = Object.values(clearedData)
		let placeholders = new Array(values.length).fill("?")
		dto.insert = `INSERT INTO ${table} (${keys.join(", ")})`
		dto.values = `VALUES (${placeholders.join(", ")})`

		return await this.execute(dto.insertSqlStatement(), values)
	}

	/**
	 * @param {string} table 
	 * @param {Array<string>|null} data 
	 * @param {Array<string>|null} where 
	 */
	async update(table, data, where) {
		const dto = new DBDto()
		const clearedData = removeFalsyValuesFromObject(data)
		let set = Object.keys(clearedData).map((key) => `${key} = ?`)
		let params = Object.values(clearedData)

		dto.update = `UPDATE ${table}`
		dto.set = `SET ${set.join(", ")}`
		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			dto.where = ` WHERE ${conditionsWithParams.conditions.join(" AND ")}`
			params = conditionsWithParams.params
		}

		return await this.execute(dto.updateSqlStatement(), params)
	}

	/**
	 * @param {string} table 
	 * @param {Array<string>|null} where 
	 */
	async delete(table, where) {
		const dto = new DBDto()
		dto.delete = `DELETE FROM ${table}`
		let params = []

		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			dto.where = `WHERE ${conditionsWithParams.conditions.join(" AND ")}`
			params = conditionsWithParams.params
		}

		return await this.execute(dto.deleteSqlStatement(), params)
	}

	/**
	 * @param {string} table 
	 */
	async drop(table) {
		if (table) {
			return await this.execute(`DROP TABLE IF EXISTS ${table}`)
		}
		throw new Error("No table name to deletion")
	}
}

export default new Database()
