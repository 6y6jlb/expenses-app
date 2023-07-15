import {ExpenseTags} from "../ExpenseTags"


export class CreateExpenseTagsMigration extends ExpenseTags {
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