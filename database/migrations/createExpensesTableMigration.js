import Expenses from "../Expenses"


export class CreateExpensesTableMigration extends Expenses {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}