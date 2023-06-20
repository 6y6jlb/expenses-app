import { DEFAULT_TABLE } from "../config/consts"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import { AbstractDatabase } from "./Abstract/AbstarctDatabase"

export class ExpenseTable extends AbstractDatabase {
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
		try {
			result = await this.db.select(this.tableName, where)
			if (!result.length) {
				await this.store(new ExpenseTablesDTO(null, DEFAULT_TABLE.TITLE, DEFAULT_TABLE.CURRENCY))
				result = await this.db.select(this.tableName, where)
			}
			result
		} catch (error) {
			throw Error("Select " + this.tableName + " error, " + error.message)
		}
		return Promise.resolve(result)
	}
}
