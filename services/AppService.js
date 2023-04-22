import { DEFAULT_CATEGORIES, DEFAULT_TABLE } from "../config/consts"
import Categories from "../database/Categories"
import ExpenseTable from "../database/ExpenseTables"
import ExpensesTableCategories from "../database/ExpensesTableCategories"

class AppService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.categories = Categories
		this.tableCategories = ExpensesTableCategories
	}

	async getTables() {
		try {
			let result = await this.expenseTables.select()
			if (!result.length) {
				await this.expenseTables.store([DEFAULT_TABLE.TITLE, DEFAULT_TABLE.CURRENCY])
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
					await this.categories.store([category.title, category.description, category.title], true)
					result = this.getCategories()
				})
			}
			return result
		} catch (error) {
			throw Error("Get categories error, " + error.message)
		}
	}

	async getTableCategories(tableId) {
		try {
			return this.tableCategories.select(tableId && { tableId })
		} catch (error) {
			throw Error("Get table_categories error, " + error.message)
		}
	}

	async updateTable(dto) {
		try {
			await this.expenseTables.update({ title: dto.title, id: dto.id })
			await this.tableCategories.delete({ tableId: dto.id })
			if (dto.categories.length) {
				dto.categories.forEach(
					async (categoryId) => await this.tableCategories.store({ categoryId, tableId: dto.id })
				)
			}
		} catch (error) {
			throw Error("Update table error, " + error.message)
		}
	}
}

export default new AppService()
