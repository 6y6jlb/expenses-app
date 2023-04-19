import { create } from "zustand"
import { selectFromCategories } from "../database/categories"
import { useErrorsStore } from "./errorStore"

export const useCategoryStore = create((set, get) => ({
	categories: [],
	loading: false,
    setCategories: (categories) => {
        set({categories: [...get().categories,...categories]})
    },
	fetch: () => {
        set({loading: true})
        selectFromCategories(get().setCategories, useErrorsStore.getState().setErrors)
        set({loading: false})
    },
}))
