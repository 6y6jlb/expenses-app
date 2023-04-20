import { DEFAULT_TABLE } from "../config/consts"
import { storeExpenseTable } from "../database/expenses_tables"

class AppService {
	constructor() {}

	async init() {
		try {
			let result = await selectFromExpenseTables
			if (!Object.values(result).length) {
				result = await storeExpenseTable(DEFAULT_TABLE)
			}
			return result
		} catch (error) {
			throw Error("Init error, " + error.message)
		}
	}
}

export default new AppService();
