import ExpenseTable from "../database/ExpenseTables"
import ExpenseTags from "../database/ExpenseTags"
import Expenses from "../database/Expenses"
import { ExpensesDTO } from "./dto/expensesDTO"

class ExpenseTablesService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.expenses = Expenses
		this.expenseTags = ExpenseTags
	}

	/**
	 * @param {ExpensesDTO} dto
	 */
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
