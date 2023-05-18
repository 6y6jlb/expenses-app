import { DEFAULT_TABLE } from "../config/consts"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import AbstractDatabase from "./Abstract/AbstarctDatabase"

class ExpenseTable extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "expense_tables"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, currency TEXT);"
		return this.db.execute(sql)
	}

	async select(where) {
		let result
		let sql = `SELECT * FROM ${this.tableName} JOIN tags on expense_tags.expense_id = ${this.tableName}.id`
		let params = []

		if (where) {
			const conditionsWithParams = getWhereConditionsWithParams(removeFalsyValuesFromObject(where), params)
			sql += ` WHERE ${conditionsWithParams.conditions.join(" AND ")} ORDER BY id`
			params = conditionsWithParams.params
		}

		try {
			result = await this.execute(sql, params)
			if (!result.length) {
				await this.store(new ExpenseTablesDTO(null, DEFAULT_TABLE.TITLE, DEFAULT_TABLE.CURRENCY))
				result = await this.select.select(where)
			}
			result
		} catch (error) {
			throw Error("Select " + this.tableName + " error, " + error.message)
		}
		return Promise.resolve(result)
	}
}

export default new ExpenseTable()
