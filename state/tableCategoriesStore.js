import { create } from "zustand"
import AppService from "../services/AppService"

export const useTableCategoryStore = create((set, get) => ({
	categories: [],
	loading: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	fetch: async () => {
		set({ loading: true })
		set({ categories: await AppService.getTableCategories() })
		set({ loading: false })
	},
}))
