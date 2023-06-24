import { ExpenseTable } from "../database/ExpenseTables"
import { ExpenseTags } from "../database/ExpenseTags"
import { Expenses } from "../database/Expenses"

class ExpenseTablesService {
	constructor() {
		this.expenseTables = new ExpenseTable()
		this.expenses = new Expenses()
		this.expenseTags = new ExpenseTags()
	}

	async handle(dto) {
		try {
			if (dto.id) {
				await this.expenses.update(dto.toModel(), { id: dto.id })

				await this.expenseTags.delete({ expense_id: dto.id })
			} else {
				dto.id = await this.expenses.store(dto.toModel())
			}

			dto.tags.forEach(async (el) => {
				await this.expenseTags.store({ expense_id: dto.id, tag_id: el.id })
			})
		} catch (error) {
			throw Error(`${this.constructor.name}: ${error.message}`)
		}
	}
}

export default new ExpenseTablesService()
