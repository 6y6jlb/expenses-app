import { removeFalsyValuesFromObject } from "../helpers/common"
import AbstractDatabase from "./Abstract/AbstarctDatabase"

class ExpenseCategories extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "expense_categories"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, description TEXT);"
		return this.db.execute(sql)
	}

	async select(where) {
		try {
			await this.create()
		} catch (error) {
			throw new Error(`Create ${this.tableName}, ` + error.message)
		}

		if (where?.expenses_table_id) {
			const clearedWhere = removeFalsyValuesFromObject(where)
			let sql =
				"SELECT * FROM expense_categories JOIN expense_table_categories ON expense_categories.id = expense_table_categories.category_id"

			let conditions = Object.keys(clearedWhere).map((key) => `${key} = ?`)
			sql += ` WHERE ${conditions.join(" AND ")}`
			const params = Object.values(clearedWhere)

			return this.db.execute(sql, params)
		} else {
			return this.db.select(this.tableName, where)
		}
	}
}

export default new ExpenseCategories()
