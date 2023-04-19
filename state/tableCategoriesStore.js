import { create } from "zustand"
import { selectFromExpenseTablesCategories } from "../database/expenses_table_categories"
import { useErrorsStore } from "./errorStore"

export const useTableCategoryStore = create((set, get) => ({
	categories: [],
	loading: false,
    setCategories: (categories) => {
        set({categories: [...get().categories,...categories]})
    },
	fetch: () => {
        set({loading: true})
        selectFromExpenseTablesCategories(get().setCategories, useErrorsStore.getState().setErrors)
        set({loading: false})
    },
}))
