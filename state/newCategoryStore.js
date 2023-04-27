import { create } from "zustand"
import ExpenseCategories from "../database/ExpenseCategories"
import { ExpenseCategoriesDTO } from "../services/dto/expenseCategoriesDTO"

export const useNewCategoryStore = create((set, get) => ({
	data: {
		title: '',
		description: ''
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
		set({loading: true})
		try {
			await ExpenseCategories.store(new ExpenseCategoriesDTO(null, data.title, data.description))
			set({loading: false})
			get().hide()
		} catch (error) {
			set({loading: false})
		}
		
	}
}))
