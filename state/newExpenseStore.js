import moment from "moment"
import { create } from "zustand"
import Expenses from "../database/Expenses"
import { ExpensesDTO } from "../services/dto/expensesDTO"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"
import { useTableStore } from "./tableStore"

export const useNewExpenseStore = create((set, get) => ({
	data: {},
	loading: true,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	init: async (tableId) => {
		set({ loading: true })
		const table = Array.from(useTableStore.getState().tables).find((el) => el.id === tableId)
		await useCategoryStore.getState().fetch()
		await useTableCategoryStore.getState().fetch(tableId)
		const categories = Array.from(await useCategoryStore.getState().categories)
		const selectedCategories = Array.from(useTableCategoryStore.getState().categories).map((el) => el.category_id)
		
		const data = {
			tableId,
			date: moment(),
			amount: 1,
			currency: table.currency,
			category: "",
			description: "",
			categories: categories.filter(el=>selectedCategories.includes(el.id)),
		}
		set({ data: data })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data
		const expensesDTO = new ExpensesDTO(null, moment(data.date), data.tableId, data.category, data.currency, data.description)
		await Expenses.store(expensesDTO)
		await useTableStore.getState().init()
		set({
			data: {},
			loading: false,
		})
	},
	store: async () => {
		const data = get().data
		Expenses.store(new ExpensesDTO(null, moment(data.date), data.tableId, data.category, data.currency, data.description))
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
