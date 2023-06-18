import { create } from "zustand"
import ExpenseTablesService from "../services/ExpenseTablesService"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import { useCategoryStore } from "./categoryStore"
import { useTableStore } from "./tableStore"

export const useUpdateTableStore = create((set, get) => ({
	data: {
		table: {},
	},
	form: {
		title: "",
		currency: "",
		exchangeRate: "1",
	},
	loading: false,
	init: async (tableId) => {
		set({ loading: true })
		const table = Array.from(useTableStore.getState().tables).find((el) => el.id === tableId)
		await useCategoryStore.getState().fetch()

		const form = {
			id: table.id,
			title: table.title,
			currency: table.currency,
		}
		set({ form, data: { table } })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const form = get().form
		const tableDTO = new ExpenseTablesDTO(form.id, form.title, form.currency, form.exchangeRate)
		await ExpenseTablesService.update(tableDTO)

		await useTableStore.getState().init()
		set({ loading: false })
	},
	updateFormValues: (key, value) => {
		set({ form: { ...get().form, [key]: value } })
	},
}))
