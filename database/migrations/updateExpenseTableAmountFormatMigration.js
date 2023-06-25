import { Expenses } from "../Expenses"
export class UpdateExpenseTableAmountFormatMigration extends Expenses {
	constructor() {
		super()
	}

	async up() {
		this.db.execute("UPDATE expenses SET amount = REPLACE(amount, ',', '.');")
	}

	async down() {
		//
	}
}
