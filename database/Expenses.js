import { REPORT_GROUPS } from "../config/consts"
import AbstractDatabase from "./Abstract/AbstarctDatabase"

class Expenses extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "expenses"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT,created_at DATETIME DEFAULT CURRENT_TIMESTAMP, amount INTEGER NOT NULL, currency TEXT, description TEXT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL, " +
			"FOREIGN KEY (expenses_table_id) REFERENCES expenses_tables (id), FOREIGN KEY (category_id) REFERENCES expense_categories (id));"

		return this.db.execute(sql)
	}

	async byGroup(group = REPORT_GROUPS.DAY, where = null) {
		let groupBy = "id"
		let select = "id, DATE(created_at, 'unixepoch') as date, amount, category_id, currency, description"
		switch (group) {
			case REPORT_GROUPS.DAY:
				groupBy = "date, category_id"
				select = "DATE(created_at, 'unixepoch') as date, SUM(amount) as amount, category_id"
				break

			default:
				break
		}
		const sql = "SELECT " + select + " FROM expenses GROUP BY " + groupBy

		return this.db.execute(sql)
	}
}

export default new Expenses()
