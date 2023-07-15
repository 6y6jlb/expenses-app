import { create } from "zustand"
import { ExpenseTable } from "../database/ExpenseTables"
import AppService from "../services/AppService"

export const useTableStore = create((set, get) => ({
	tables: [],
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	init: async () => {
		if (!AppService.loaded) return
		set({ loading: true })
		get().setTables(await new ExpenseTable().select())
		set({ loading: false })
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
