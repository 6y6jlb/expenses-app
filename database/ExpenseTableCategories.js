import Database from "../services/Database"

class ExpenseTableCategories {
	constructor() {
		this.db = Database
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_table_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL," +
			"FOREIGN KEY (expenses_table_id) REFERENCES expenses_tables (id), FOREIGN KEY (category_id) REFERENCES expense_categories (id));"
		return this.db.execute(sql)
	}

	async select(data = null) {
		try {
			await this.create()
		} catch (error) {
			throw new Error("Create expense_table_categories, " + error.message)
		}
		let sql = "SELECT * FROM expense_table_categories "
		const params = [];
		if (data?.table_id) {
			sql += "WHERE expenses_table_id = ?"
			params.push(data.table_id)
		}

		return this.db.execute(sql, params)
	}

	async store(dto) {
		const sql = "INSERT INTO expense_table_categories (category_id, expenses_table_id) VALUES (?,?);"

		return this.db.execute(sql, [dto.category_id, dto.expenses_table_id])
	}

	async update() {
		return new Promise((resolve, reject) => reject({ message: "Icorrect method" }))
	}

	async delete(dto) {
		const sql = "DELETE FROM expense_table_categories WHERE expenses_table_id = ? ;"

		return this.db.execute(sql, [dto.id])
	}

	async drop() {
		const sql = "DROP TABLE expense_table_categories;"
		return this.db.execute(sql)
	}
}

export default new ExpenseTableCategories()