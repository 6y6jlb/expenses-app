import { ExpenseCategories } from "../ExpenseCategories"

export class CreateExpenseCategoriesTableMigration extends ExpenseCategories {
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
