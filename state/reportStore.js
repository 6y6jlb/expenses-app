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
		const date = {
			from: moment(),
			to: moment().subtract(1, "months"),
		}
		const rows = geDateRange(date.from, date.to)

		const expensesByDay = Array.from(await Expenses.byGroup("day", { expenses_table_id: tableId }))

		const selectedCategories = new Set(expensesByDay.map((el) => el.category_id))
		const categories = Array.from(await ExpenseCategories.select()).filter((el) => selectedCategories.has(el.id))

		for (const date in rows) {
			categories.forEach((el) => {
				rows[date][el.id] = 0
			})
		}
		expensesByDay.forEach((el) => {
			if (rows[el.date]) {
				rows[el.date] = { ...rows[el.date], [el.category_id]: el.amount }
			}
		})

		for (const date in rows) {
			rows[date] = Object.values(rows[date])
			rows[date].unshift(date)
		}

		set({ headers: ["дата", ...categories.map((el) => el.title)] })
		set({ rows: Object.values(rows) })
		set({ loading: false })
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
