import { create } from "zustand"
import ExpenseTables from "../database/ExpenseTables"
import AppService from "../services/AppService"
import { geDateRange } from "../helpers/dateRange"
import moment from "moment"
import { useTableCategoryStore } from "./tableCategoriesStore"

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
		await useTableCategoryStore.getState().fetch(tableId)
		set({ categories: useTableCategoryStore.getState().categories })
		set({ headers: ['дата', ...Array.from(useTableCategoryStore.getState().categories)] })
		const expensesByDay = []
		const dateRange = geDateRange(moment(), moment().subtract(1, 'months'))
		
		set({ rows: Object.entries(dateRange).map(el=>[el[0]]) })
		set({ loading: false })
	},
	update: (data) => {
		ExpenseTables.update(data)
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
