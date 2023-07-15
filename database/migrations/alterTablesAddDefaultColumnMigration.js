import { ExpenseTable } from "../ExpenseTables"
export class AlterTablesAddDefaultColumnMigration extends ExpenseTable {
	constructor() {
		super()
	}

	async up() {
		const pragmaInfoRow = await this.db.execute(
			"SELECT COUNT(*) as count FROM pragma_table_info('expense_tables') WHERE name = 'default';"
		)
		if (pragmaInfoRow[0]["count"]) {
			return
		}

		await this.db.execute("ALTER TABLE expense_tables ADD COLUMN 'default' BOOLEAN DEFAULT 0;")

		const tables = await this.select()
		if (tables[0]) {
			await this.db.execute("UPDATE TABLE expense_tables SET 'default' = 1 WHERE id = " + tables[0].id + ";")
		}
	}

	async down() {
		const result = await this.db.execute(
			"SELECT COUNT(*) as count FROM pragma_table_info('expense_tables') WHERE name = 'default';"
		)
		if (result[0]["count"]) {
			// i think it does not work in sqlite
			await this.db.execute("ALTER TABLE expense_tables DROP COLUMN 'default';")
		}

		return
	}
}
