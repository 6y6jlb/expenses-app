import { create } from "zustand"
import ExpenseTables from "../database/ExpenseTables"
import AppService from "../services/AppService"
import { geDateRange } from "../helpers/dateRange"
import moment from "moment"
import { useTableCategoryStore } from "./tableCategoriesStore"
import { useCategoryStore } from "./categoryStore"
import CategoriesService from "../services/CategoriesService"
import ExpenseCategories from "../database/ExpenseCategories"

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
		const expensesByDay = []
		const dateRange = geDateRange(moment(), moment().subtract(1, "months"))

		set({ rows: Object.entries(dateRange).map((el) => [el[0]]) })
		set({ loading: false })
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
