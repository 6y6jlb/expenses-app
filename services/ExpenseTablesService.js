import ExpenseTable from "../database/ExpenseTables"
import Expenses from "../database/Expenses"
// import Exchange from "../http/Exchange"

class ExpenseTablesService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.expenses = Expenses
	}

	async update(dto) {
		try {
			const currentTable = (await this.expenseTables.select({ id: dto.id }))[0]

			await this.expenseTables.update({ currency: dto.currency, title: dto.title }, { id: dto.id })

			if (currentTable.currency !== dto.currency && dto.exchangeRate != 1) {
				const expenses = await this.expenses.select({ expenses_table_id: dto.id })

				// const rate = await Exchange.get({ count: 1, current: dto.currency, target: currentTable.currency })

				expenses.forEach(async (el) => {
					await this.expenses.update(
						{ currency: dto.currency, amount: dto.exchangeRate * el.amount },
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
