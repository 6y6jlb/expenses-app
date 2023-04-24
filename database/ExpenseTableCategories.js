import AbstractDatabase from "./Abstract/AbstarctDatabase";

class ExpenseTableCategories extends AbstractDatabase {
	constructor() {
		super();
		this.tableName = "expense_table_categories"
	}

	async create() {
		const sql =
			"CREATE TABLE IF NOT EXISTS expense_table_categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, expenses_table_id INTEGER NOT NULL," +
			"FOREIGN KEY (expenses_table_id) REFERENCES expenses_tables (id), FOREIGN KEY (category_id) REFERENCES expense_categories (id));"
		return this.db.execute(sql)
	}

}

export default new ExpenseTableCategories()
