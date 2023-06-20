import {AbstractDatabase} from "./Abstract/AbstarctDatabase"

export class Migration extends AbstractDatabase {
	constructor() {
		super()
		this.tableName = "migration"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS migration (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE);"
		return this.db.execute(sql)
	}

}

