import { DEFAULT_CATEGORIES, DEFAULT_TABLE } from "../config/consts"
import ExpenseCategories from "../database/ExpenseCategories"
import ExpenseTableCategories from "../database/ExpenseTableCategories"
import ExpenseTable from "../database/ExpenseTables"
import Expenses from "../database/Expenses"
import Database from "./Database"
import { ExpenseCategoriesDTO } from "./dto/expenseCategoriesDTO"


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

	async getCategories() {
		try {
			let result = await this.categories.select()
			if (!result.length) {
				DEFAULT_CATEGORIES.forEach(async (category) => {
					await this.categories.store(new ExpenseCategoriesDTO(null, category.title, category.description))
				})
				result = await this.getCategories()
			}
			return result
		} catch (error) {
			throw Error("Get categories error, " + error.message)
		}
	}

	async updateTable(etDTO, selectedCategories) {
		try {
			await this.expenseTables.update(etDTO)
			await this.tableCategories.delete({ expense_table_id: etDTO.id })
			if (selectedCategories.length) {
				selectedCategories.forEach(
					async (categoryId) =>
						await this.tableCategories.store(new ExpenseTableCategoriesDTO(null, etDTO.id, categoryId))
				)
			}
		} catch (error) {
			throw Error("Update table error, " + error.message)
		}
	}

	async drop() {
		this.db.drop()
	}
}

export default new AppService()
