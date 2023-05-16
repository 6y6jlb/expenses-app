import AbstractDatabase from "./Abstract/AbstarctDatabase"

class ExpenseTags extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "expense_tags"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_tags (id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"FOREIGN KEY (expense_id) REFERENCES expenses (id), " +
			"FOREIGN KEY (tag_id) REFERENCES tags (id));"

		return this.db.execute(sql)
	}
}

export default new ExpenseTags()
