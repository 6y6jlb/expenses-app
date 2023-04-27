import { create } from "zustand"
import ExpenseTables from "../database/ExpenseTables"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import { useCategoryStore } from "./categoryStore"
import { useTableStore } from "./tableStore"

export const useUpdateTableStore = create((set, get) => ({
	data: {
		title: "",
		currency: "",
	},
	loading: false,
	init: async (tableId) => {
		set({ loading: true })
		const table = Array.from(useTableStore.getState().tables).find((el) => el.id === tableId)
		await useCategoryStore.getState().fetch()

		const data = {
			id: table.id,
			title: table.title,
			currency: table.currency,
		}
		set({ data: data })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data
		const etDTO = new ExpenseTablesDTO(data.id, data.title, data.currency)
		await ExpenseTables.update(etDTO)
		await useTableStore.getState().init()
		set({
			data: {
				title: "",
				currency: "",
			},
			loading: false,
		})
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))
