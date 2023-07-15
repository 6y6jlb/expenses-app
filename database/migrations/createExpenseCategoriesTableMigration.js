import { ExpenseCategories } from "../ExpenseCategories"

export class CreateExpenseCategoriesTableMigration extends ExpenseCategories {
	constructor() {
		super()
	}

	async up() {
		await this.create()
	}

	async down() {
		await this.drop()
	}
}
