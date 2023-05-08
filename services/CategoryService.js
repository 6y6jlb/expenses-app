import { DEFAULT_CATEGORIES } from "../config/consts"
import ExpenseCategories from "../database/ExpenseCategories"
import { ExpenseCategoriesDTO } from "./dto/expenseCategoriesDTO"

class CategoryService {
	constructor() {
		this.categories = ExpenseCategories
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
}

export default new CategoryService()
