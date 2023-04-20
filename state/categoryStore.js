import { create } from "zustand"
import AppService from "../services/AppService"

export const useCategoryStore = create((set, get) => ({
	categories: [],
	loading: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	fetch: async () => {
		set({ loading: true })
		set({ categories: await AppService.getCategories() })
		set({ loading: false })
	},
}))
