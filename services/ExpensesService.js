import ExpenseTable from "../database/ExpenseTables"
import ExpenseTags from "../database/ExpenseTags"
import Expenses from "../database/Expenses"


class ExpenseTablesService {
	constructor() {
		this.expenseTables = ExpenseTable
		this.expenses = Expenses
		this.expenseTags = ExpenseTags
	}

	async handle(expensesDTO) {
		try {
			if(expensesDTO.id) {
				await this.expenses.update(expensesDTO.toModel(), { id: expensesDTO.id })
				
				await this.expenseTags.delete({expense_id: expensesDTO.id})
			} else {
				expensesDTO.id = await this.expenses.store(expensesDTO.toModel())
			}

			expensesDTO.tags.forEach(async el=>{
				await this.expenseTags.store({expense_id: expensesDTO.id, tag_id: el.id})
			})
			
			
		} catch (error) {
			throw Error(`${this.constructor.name}: ${error.message}`)
		}
	}
}

export default new ExpenseTablesService()
