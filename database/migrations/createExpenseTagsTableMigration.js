import ExpenseTags from "../ExpenseTags"


export class CreateExpenseTagsMigration extends ExpenseTags {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}