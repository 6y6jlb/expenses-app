import ExpenseCategories from "../database/ExpenseCategories"
import ExpenseTable from "../database/ExpenseTables"
import ExpenseTags from "../database/ExpenseTags"
import Expenses from "../database/Expenses"
import Tags from "../database/Tags"
import Database from "./Database"


class AppService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.categories = ExpenseCategories
		this.tags = Tags
		this.expenses = Expenses
		this.expenseTags = ExpenseTags
		this.db = Database
	}

	async init() {
		try {
			await this.expenseTables.create()
			await this.categories.create()
			await this.tags.create()
			await this.expenses.create()
			await this.expenseTags.create()
		} catch (error) {
			throw Error("Init tables error: " + error.message)
		}
	}


	async drop() {
		this.db.drop()
	}
}

export default new AppService()
