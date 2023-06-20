import { ExpenseTable } from "../ExpenseTables"

export class CreateExpenseTableMigration extends ExpenseTable {
	constructor() {
		super()
	}

	async up() {
		this.create()
	}

	async down() {
		this.drop()
	}
}
