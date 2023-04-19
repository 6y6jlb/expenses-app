import { create } from "zustand"
import { selectFromExpenseTables, updateExpenseTable } from "../database/expenses_tables"
import { useErrorsStore } from "./errorStore"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"

export const useTableStore = create((set, get) => ({
	tables: [],
	loading: false,
    setTables: (tables) => {
        set({tables: [...tables]})
    },
	init: () => {
        set({loading: true})
        selectFromExpenseTables(get().setTables, useErrorsStore.getState().setErrors)
        useCategoryStore.getState().fetch()
        useTableCategoryStore.getState().fetch()
        set({loading: false})
    },
    update: (data)=>{
        updateExpenseTable(data)
    },
	removeAll: () => set({ tables: [], loading: false }),
}))
