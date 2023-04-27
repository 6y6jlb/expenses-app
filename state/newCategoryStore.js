import { create } from "zustand"
import ExpenseCategories from "../database/ExpenseCategories"
import { ExpenseCategoriesDTO } from "../services/dto/expenseCategoriesDTO"
import { useCategoryStore } from "./categoryStore"

export const useNewCategoryStore = create((set, get) => ({
	data: {
		title: "",
		description: "",
	},
	loading: false,
	visible: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	show: async () => {
		set({ visible: true })
	},
	hide: () => {
		set({ visible: false })
	},
	submit: async () => {
		set({ loading: true })
		try {
			const data = get().data
			await ExpenseCategories.store(new ExpenseCategoriesDTO(null, data.title, data.description))
			await useCategoryStore.getState().fetch()
			set({ loading: false })
			get().hide()
		} catch (error) {
			console.log(error)
			set({ loading: false })
		}
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))
