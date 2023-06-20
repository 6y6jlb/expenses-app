import ExpenseCategories from "../ExpenseCategories"


export class CreateExpenseCategoriesTableMigration extends ExpenseCategories {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}