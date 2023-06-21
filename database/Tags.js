import { AbstractDatabase } from "./Abstract/AbstarctDatabase"

export class Tag extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "tags"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE);"
		return this.db.execute(sql)
	}
}
