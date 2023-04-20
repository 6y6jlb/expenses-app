import { create } from "zustand"
import { useTableStore } from "./tableStore"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"

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
		const selectedCategories = Array.from(useTableCategoryStore.getState().categories).map(el=>el.id)

		const data = {
			id: table.id,
			title: table.title,
			currency: table.currency,
			categories,
			selectedCategories,
		}
		set({ data: data })
	},
	submit: () => {
		useTableStore.getState().update(get().data)
		useTableStore.getState().init()
		get().hide()
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},

	hide: () =>
		set({
			data: {
				title: "",
				currency: "",
				categories: [],
				selectedCategories: [],
			},
			visible: false,
		}),
}))
