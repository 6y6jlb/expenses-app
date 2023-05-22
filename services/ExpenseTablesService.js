import ExpenseTable from "../database/ExpenseTables"
import Expenses from "../database/Expenses"
import Exchange from "../http/Exchange"
import { ExpenseTablesDTO } from "./dto/expenseTablesDTO"

class ExpenseTablesService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.expenses = Expenses
	}

	/**
	 * @param {ExpenseTablesDTO} dto
	 */
	async update(dto) {
		try {
			const currentTable = (await this.expenseTables.select({ id: dto.id }))[0]

			await this.expenseTables.update(dto)

			if (currentTable.currency !== dto.currency) {

				const expenses = await this.expenses.select({ expenses_table_id: dto.id })

				const rate = await Exchange.get({ count: 1, current: dto.currency, target: currentTable.currency })
				
				expenses.forEach(async (el) => {
					await this.expenses.update(
						{ currency: dto.currency, amount: rate * el.amount },
						{ id: el.id }
					)
				})
			}
		} catch (error) {
			throw Error(`${this.constructor.name}: ${error.message}`)
		}
	}
}

export default new ExpenseTablesService()
