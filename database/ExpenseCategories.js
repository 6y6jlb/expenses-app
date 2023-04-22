import Database from "../services/Database"

class ExpenseCategories {
	constructor() {
		this.db = Database
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, description TEXT);"
		return this.db.execute(sql)
	}

	async select(params = null) {
		try {
			await this.create()
		} catch (error) {
			throw new Error("Create expense_categories, " + error.message)
		}
		const sql = "SELECT * FROM expense_categories"

		return this.db.execute(sql, params)
	}

	async store(params, isDefault = false) {
		let sql = "INSERT INTO expense_categories (title, description) VALUES (?,?);"

		if (isDefault) {
			sql =
				"INSERT INTO expense_categories(title,description) SELECT ?, ? WHERE NOT EXISTS(SELECT 1 FROM categories WHERE title = ?);"
		}

		return this.db.execute(sql, params)
	}

	async update(params) {
		const sql = "UPDATE expense_categories SET title = ?, currency = ? WHERE id = ? ;"

		return this.db.execute(sql, params)
	}

	async drop() {
		const sql = "DROP TABLE IF EXISTS expense_categories;"
		return this.db.execute(sql)
	}
}

export default new ExpenseCategories()
