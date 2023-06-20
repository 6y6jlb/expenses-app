import ExpenseTables from "../ExpenseTables"


export class CreateExpenseTableMigration extends ExpenseTables {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}