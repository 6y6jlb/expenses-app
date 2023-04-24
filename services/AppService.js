import { DEFAULT_CATEGORIES, DEFAULT_TABLE } from "../config/consts"
import ExpenseCategories from "../database/ExpenseCategories"
import ExpenseTableCategories from "../database/ExpenseTableCategories"
import ExpenseTable from "../database/ExpenseTables"
import { ExpenseCategoriesDTO } from "./dto/expenseCategoriesDTO"
import { ExpenseTableCategoriesDTO } from "./dto/expenseTableCategoriesDTO"
import { ExpenseTablesDTO } from "./dto/expenseTablesDTO"

class AppService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.categories = ExpenseCategories
		this.tableCategories = ExpenseTableCategories
	}

	async getTables() {
		try {
			let result = await this.expenseTables.select()
			if (!result.length) {
				await this.expenseTables.store(new ExpenseTablesDTO(null, DEFAULT_TABLE.TITLE, DEFAULT_TABLE.CURRENCY))
				result = this.getTables()
			}
			return result
		} catch (error) {
			throw Error("Get tables error, " + error.message)
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
				console.log(result)
			}
			return result
		} catch (error) {
			throw Error("Get categories error, " + error.message)
		}
	}

	async getTableCategories(tableId) {
		try {
			const result = await this.tableCategories.select(new ExpenseTableCategoriesDTO(tableId, null, null))
			return result
		} catch (error) {
			throw Error("Get table_categories error, " + error.message)
		}
	}

	async updateTable(etDTO, selectedCategories) {
		try {
			await this.expenseTables.update(etDTO)
			await this.tableCategories.delete(etDTO)
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
}

export default new AppService()
