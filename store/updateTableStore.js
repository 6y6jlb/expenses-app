import { showMessage } from "react-native-flash-message"
import { create } from "zustand"
import i18n from "../i18n/configuration"
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
	init: async (table) => {
		set({ loading: true })
		await useCategoryStore.getState().fetch()
		const form = {
			id: table.id,
			title: table.title,
			currency: table.currency,
			exchangeRate: "1",
		}
		set({ form, data: { table } })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const form = get().form
		const tableDTO = new ExpenseTablesDTO(form.id, form.title, form.currency, form.exchangeRate)

		try {
			await ExpenseTablesService.update(tableDTO)
			showMessage({ type: "success", message: i18n.t("notification.table_save_success") })
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.table_save_error") })
		} finally {
			await useTableStore.getState().init()
			set({ loading: false })
		}
	},
	updateFormValues: (key, value) => {
		set({ form: { ...get().form, [key]: value } })
	},
}))
