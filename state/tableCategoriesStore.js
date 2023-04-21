import { create } from "zustand"
import AppService from "../services/AppService"

export const useTableCategoryStore = create((set, get) => ({
	categories: [],
	loading: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	fetch: async (tableId = null) => {
		set({ loading: true })
		set({ categories: await AppService.getTableCategories(tableId) })
		set({ loading: false })
	},
}))
