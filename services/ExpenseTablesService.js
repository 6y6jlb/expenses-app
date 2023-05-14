import ExpenseTable from "../database/ExpenseTables"
import Expenses from "../database/Expenses"
import Exchange from "../http/Exchange"

class ExpenseTablesService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.expenses = Expenses
	}

	async update(exDto) {
		try {
			const currentTable = (await this.expenseTables.select({ id: exDto.id }))[0]

			await this.expenseTables.update(exDto)

			if (currentTable.currency !== exDto.currency) {

				const expenses = await this.expenses.select({ expenses_table_id: exDto.id })

				const rate = await Exchange.get({ count: 1, current: exDto.currency, target: currentTable.currency })
				
				expenses.forEach(async (el) => {
					await this.expenses.update(
						{ currency: exDto.currency, amount: rate * el.amount },
						{ id: el.id }
					)
				})
			}
		} catch (error) {
			throw Error("Init tables error: " + error.message)
		}
	}
}

export default new ExpenseTablesService()
