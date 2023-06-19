import AbstractDatabase from "./Abstract/AbstarctDatabase"

class Tags extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "tags"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, allow_expenses INTEGER);"
		return this.db.execute(sql)
	}

}

export default new Tags()
