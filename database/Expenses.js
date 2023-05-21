import { DEFAULT_DAY_FORMAT, REPORT_GROUPS } from "../config/consts"
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
		let groupBy = "e.id"
		let select =
			"e.id as id, DATE(e.created_at, 'unixepoch') as date, amount, category_id, currency, description, GROUP_CONCAT(t.title) AS tags"
		let join = ""
		switch (group) {
			case REPORT_GROUPS.DAY:
				groupBy = "date, category_id, currency"
				select = "DATE(created_at, 'unixepoch') as date, SUM(amount) as amount, category_id, currency"
				break

			default:
				join = "JOIN expense_tags as et on et.expense_id = e.id JOIN tags as t on t.id = et.tag_id"
				break
		}

		let sql = "SELECT " + select + " FROM expenses as e " + join

		if (where) {
			sql += " WHERE created_at BETWEEN " + where.to.format("X") + " AND " + where.from.format("X")
		}

		sql += " GROUP BY " + groupBy

		return this.db.execute(sql)
	}
}

export default new Expenses()
