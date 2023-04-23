import { create } from "zustand"
import AppService from "../services/AppService"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"
import { useTableStore } from "./tableStore"

export const useUpdateTableStore = create((set, get) => ({
	data: {
		title: "",
		currency: "",
		categories: [],
		selectedCategories: [],
	},
	loading: false,
	init: async (tableId) => {
		set({ loading: true })
		const table = Array.from(useTableStore.getState().tables).find((el) => el.id === tableId)
		await useCategoryStore.getState().fetch()
		await useTableCategoryStore.getState().fetch(tableId)
		const categories = await useCategoryStore.getState().categories
		const selectedCategories = Array.from(useTableCategoryStore.getState().categories).map((el) => el.category_id)

		const data = {
			id: table.id,
			title: table.title,
			currency: table.currency,
			categories,
			selectedCategories,
		}
		set({ data: data })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data
		const etDTO = new ExpenseTablesDTO(data.id, data.title, data.currency)
		await AppService.updateTable(etDTO, data.selectedCategories)
		await useTableStore.getState().init()
		set({
			data: {
				title: "",
				currency: "",
				categories: [],
				selectedCategories: [],
			},
			loading: false,
		})
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))
