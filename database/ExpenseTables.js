import AbstractDatabase from "./Abstract/AbstarctDatabase";

class ExpenseTable extends AbstractDatabase {
	constructor() {
		super();
		this.tableName = "expense_tables"
	}

	async create() {
		const sql = "CREATE TABLE IF NOT EXISTS expense_tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, currency TEXT);"
		return this.db.execute(sql)
	}

}

export default new ExpenseTable();
