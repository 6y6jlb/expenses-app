import Database from "../services/Database"

class Expenses {
	constructor() {
		this.db = Database
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT,created_at DATETIME DEFAULT CURRENT_TIMESTAMP, amount INTEGER NOT NULL, currency TEXT, description TEXT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL), "+
			"FOREIGN KEY (expenses_table_id) REFERENCES expenses_tables (id), FOREIGN KEY (category_id) REFERENCES expense_categories (id));"
		return this.db.execute(sql)
	}

	async select(params = null) {
		try {
			await this.create()
		} catch (error) {
			throw new Error("Create expenses, " + error.message)
		}
		const sql = "SELECT * FROM expenses"

		return this.db.execute(sql, params)
	}

	async store(params) {
		const sql = "INSERT INTO expenses (amount, created_at, category_id, expenses_table_id, currency, description) VALUES (?,?,?,?,?,?);"

		return this.db.execute(sql, [params.amount, params.created_at, params,category_id, params.expenses_table_id, params.currency, params.description])
	}

	async update(params) {
		const sql = "UPDATE expenses SET amount = ?, created_at = ?, currency = ?, category_id = ?, description = ? WHERE id = ? ;"
		return this.db.execute(sql, [params.amount, params.created_at, params.currency, params.category_id, params.description, params.id])
	}

	async drop() {
		const sql = "DROP TABLE IF EXISTS expenses;"
		return this.db.execute(sql)
	}
}

export default new ExpenseTable();
