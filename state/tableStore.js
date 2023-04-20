import { create } from "zustand"
import { selectFromExpenseTables, updateExpenseTable } from "../database/expenses_tables"
import { useErrorsStore } from "./errorStore"
import { useCategoryStore } from "./categoryStore"
import { useTableCategoryStore } from "./tableCategoriesStore"
import AppService from "../services/AppService"

export const useTableStore = create((set, get) => ({
	tables: [],
	loading: false,
    setTables: (tables) => {
        set({tables: [...tables]})
    },
	init: async () => {
        set({loading: true})
        const resutl = await AppService.init()
        console.log(result)
        useCategoryStore.getState().fetch()
        useTableCategoryStore.getState().fetch()
        set({loading: false})
    },
    update: (data)=>{
        updateExpenseTable(data)
    },
	removeAll: () => set({ tables: [], loading: false }),
}))
