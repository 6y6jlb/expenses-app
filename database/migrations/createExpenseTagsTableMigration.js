import {ExpenseTags} from "../ExpenseTags"


export class CreateExpenseTagsMigration extends ExpenseTags {
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