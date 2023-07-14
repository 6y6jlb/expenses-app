import { create } from "zustand"
import {ExpenseCategories} from "../database/ExpenseCategories"
import { ExpenseCategoriesDTO } from "../services/dto/expenseCategoriesDTO"
import { useCategoryStore } from "./categoryStore"
import i18n from "../i18n/configuration"
import { showMessage } from "react-native-flash-message"

export const useNewCategoryStore = create((set, get) => ({
	data: {
		title: "",
		description: "",
	},
	loading: false,
	categories: [],
	setCategories: (categories) => {
		set({ categories: [...get().categories, ...categories] })
	},
	
	submit: async () => {
		set({ loading: true })
		try {
			const data = get().data
			await new ExpenseCategories().store(new ExpenseCategoriesDTO(null, data.title, data.description))
			showMessage({ type: "success", message: i18n.t("notification.category_save_success") })
			await useCategoryStore.getState().fetch()
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.category_save_error") })
		} finally {
			set({ loading: false })
		}
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))
