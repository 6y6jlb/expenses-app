import {AbstractDatabase} from "./Abstract/AbstarctDatabase"

export class ExpenseCategories extends AbstractDatabase {
	constructor() {
		super();
		this.tableName = "expense_categories";
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, description TEXT);"
		return this.db.execute(sql)
	}
}


