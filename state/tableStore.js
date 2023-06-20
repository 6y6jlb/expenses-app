import { create } from "zustand"
import { ExpenseTable } from "../database/ExpenseTables"

export const useTableStore = create((set, get) => ({
	tables: [],
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	init: async () => {
		set({ loading: true })
		set({ tables: await new ExpenseTable().select() })
		set({ loading: false })
	},
	update: (data) => {
		ExpenseTable.update(data)
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
