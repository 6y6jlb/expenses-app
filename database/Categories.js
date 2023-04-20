import Database from "../services/Database"

class Categories {
	constructor() {
		this.db = Database
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, description TEXT);"
		return this.db.execute(sql)
	}

	async select(params = null) {
		try {
			await this.create()
		} catch (error) {
			throw new Error("Create categories, " + error.message)
		}
		const sql = "SELECT * FROM categories"

		return this.db.execute(sql, params)
	}

	async store(params, isDefault = false) {
		let sql = "INSERT INTO categories (title, description) VALUES (?,?);"

		if (isDefault) {
			sql =
				"INSERT INTO categories(title,description) SELECT ?, ? WHERE NOT EXISTS(SELECT 1 FROM categories WHERE title = ?);"
		}

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

export default new Categories()
