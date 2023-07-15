import { DEFAULT_TABLE } from "../../config/consts";
import { ExpenseTablesDTO } from "../../services/dto/expenseTablesDTO";
import { ExpenseTable } from "../ExpenseTables"

export class CreateExpenseTableMigration extends ExpenseTable {
	constructor() {
		super()
	}

	async up() {
		await this.create()
		const tables = await this.select();
		if (!tables.length) {
			await this.store(new ExpenseTablesDTO(null, DEFAULT_TABLE.TITLE, DEFAULT_TABLE.CURRENCY))
		}
	}

	async down() {
		await this.drop()
	}
}
