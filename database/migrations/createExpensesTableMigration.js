import {Expenses} from "../Expenses"


export class CreateExpensesTableMigration extends Expenses {
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