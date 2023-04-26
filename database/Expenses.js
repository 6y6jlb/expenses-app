import AbstractDatabase from "./Abstract/AbstarctDatabase";

class Expenses extends AbstractDatabase {
	constructor() {
		super();
		this.tableName = "expenses"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT,created_at DATETIME DEFAULT CURRENT_TIMESTAMP, amount INTEGER NOT NULL, currency TEXT, description TEXT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL, " +
			"FOREIGN KEY (expenses_table_id) REFERENCES expenses_tables (id), FOREIGN KEY (category_id) REFERENCES expense_categories (id));"

		return this.db.execute(sql)
	}

	async byGroup(group = 'day', where = null) {
		const sql = 'SELECT date(created_at) as expense_day, sum(amount), category_id FROM expenses GROUP BY expense_day'

		return this.db.execute(sql)
	}

}

export default new Expenses()
