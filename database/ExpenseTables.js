import Database from "../services/Database"

class ExpenseTable {
	constructor() {
		this.db = Database
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, currency TEXT);"
		return this.db.execute(sql)
	}

	async select(params = null) {
		try {
			await this.create()
		} catch (error) {
			throw new Error("Create expense_table, " + error.message)
		}
		const sql = "SELECT * FROM expense_tables"

		return this.db.execute(sql, params)
	}

	async store(params) {
		const sql = "INSERT INTO expense_tables (title, currency) VALUES (?,?);"

		return this.db.execute(sql, params)
	}

	async update(params) {
		const sql = "UPDATE expense_tables SET title = ?, currency = ? WHERE id = ? ;"
		return this.db.execute(sql, params)
	}

	async drop() {
		const sql = "DROP TABLE IF EXISTS expense_tables;"
		return this.db.execute(sql)
	}
}

export default new ExpenseTable();
