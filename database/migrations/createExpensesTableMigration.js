import {Expenses} from "../Expenses"


export class CreateExpensesTableMigration extends Expenses {
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