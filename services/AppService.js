import ExpenseCategories from "../database/ExpenseCategories"
import ExpenseTable from "../database/ExpenseTables"
import Expenses from "../database/Expenses"
import Database from "./Database"


class AppService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.categories = ExpenseCategories
		this.expenses = Expenses
		this.db = Database
	}

	async init() {
		try {
			await this.expenseTables.create()
			await this.categories.create()
			await this.expenses.create()
		} catch (error) {
			throw Error("Init tables error: " + error.message)
		}
	}


	async drop() {
		this.db.drop()
	}
}

export default new AppService()
