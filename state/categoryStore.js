import { create } from "zustand"
import AppService from "../services/AppService"
import ExpenseCategories from "../database/ExpenseCategories"

export const useCategoryStore = create((set, get) => ({
	categories: [],
	selectedCategories: [],
	loading: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	fetch: async () => {
		set({ loading: true })
		set({ categories: await AppService.getCategories() })
		set({ loading: false })
	},
	remove: async () => {
		try {
			set({ loading: true })
			await ExpenseCategories.delete({ id: get().selectedCategories })
			await get().fetch()
		} catch (error) {
			console.log(error)
		} finally {
			set({ loading: false })
		}
	},
	updateSelectedCategories: (value) => {
		set({ selectedCategories: value })
	},
}))
