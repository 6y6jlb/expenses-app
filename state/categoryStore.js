import { create } from "zustand"
import CategoryService from "../services/CategoryService"
import { ExpenseCategories } from "../database/ExpenseCategories"
import i18n from "../i18n/configuration"
import { showMessage } from "react-native-flash-message"

export const useCategoryStore = create((set, get) => ({
	categories: [],
	selectedCategories: [],
	loading: false,
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	fetch: async () => {
		set({ loading: true })
		set({ categories: await CategoryService.getCategories() })
		set({ loading: false })
	},
	remove: async () => {
		try {
			set({ loading: true })
			await new ExpenseCategories().delete({ id: get().selectedCategories })
			showMessage({ type: "success", message: i18n.t("notification.category_remove_success") })
			await get().fetch()
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.category_remove_error") })
		} finally {
			set({ loading: false })
		}
	},
	updateSelectedCategories: (value) => {
		set({ selectedCategories: value })
	},
}))
