import { create } from "zustand"
import ExpenseTables from "../database/ExpenseTables"
import AppService from "../services/AppService"

export const useTableStore = create((set, get) => ({
	tables: [],
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	init: async () => {
		set({ loading: true })
		set({ tables: await AppService.getTables() })
		set({ loading: false })
	},
	update: (data) => {
		ExpenseTables.update(data)
	},
	removeAll: () => set({ tables: [], loading: false }),
}))
