import { create } from "zustand"
import { useTableStore } from "./tableStore"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"
import AppService from "../services/AppService"
import UpdateTableDTO from "../services/dto/updateTableDTO"

export const useUpdateTableStore = create((set, get) => ({
	data: {
		title: "",
		currency: "",
		categories: [],
		selectedCategories: [],
	},
	visible: false,
	show: async (tableId) => {
		set({ visible: true })
		const table = Array.from(useTableStore.getState().tables).find((el) => el.id === tableId)
		await useCategoryStore.getState().fetch()
		await useTableCategoryStore.getState().fetch(tableId)
		const categories = await useCategoryStore.getState().categories
		console.log(useTableCategoryStore.getState().categories)
		const selectedCategories = Array.from(useTableCategoryStore.getState().categories).map((el) => el.category_id)

		const data = {
			id: table.id,
			title: table.title,
			currency: table.currency,
			categories,
			selectedCategories,
		}
		set({ data: data })
	},
	submit: async () => {
		const data = get().data;
		await AppService.updateTable(new UpdateTableDTO(data.id, data.title, data.currency, data.selectedCategories))
		await useTableStore.getState().init()
		get().hide()
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},

	hide: () => {
		set({
			data: {
				title: "",
				currency: "",
				categories: [],
				selectedCategories: [],
			},
			visible: false,
		})
	},
}))
