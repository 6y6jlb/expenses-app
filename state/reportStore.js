import moment from "moment"
import { create } from "zustand"
import ExpenseCategories from "../database/ExpenseCategories"
import { geDateRange } from "../helpers/dateRange"
import Expenses from "../database/Expenses"

export const useReportStore = create((set, get) => ({
	headers: [],
	categories: [],
	rows: [],
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	init: async (tableId) => {
		set({ loading: true })
		const categories = await ExpenseCategories.select({ expenses_table_id: tableId })
		set({ headers: ["дата", ...Array.from(categories).map((el) => el.title)] })
		const expensesByDay = await Expenses.byGroup('day' , {expenses_table_id: tableId})
		debugger;
		const dateRange = geDateRange(moment(), moment().subtract(1, "months"))

		set({ rows: Object.entries(dateRange).map((el) => [el[0]]) })
		set({ loading: false })
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
