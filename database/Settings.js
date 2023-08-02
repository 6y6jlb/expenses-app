import { AbstractDatabase } from "./Abstract/AbstarctDatabase"

export class Settings extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "settings"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS " +
			this.tableName +
			" (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE, value TEXT, payload TEXT);"
		return this.db.execute(sql)
	}
}
