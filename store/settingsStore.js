import { showMessage } from "react-native-flash-message"
import { create } from "zustand"
import { SETTINGS, COMMON_SCREEN_STATE as STATE } from "../config/consts"
import { Settings } from "../database/Settings"
import i18n from "../i18n/configuration"
import ExpenseTablesService from "../services/ExpenseTablesService"
import { ExpenseTablesDTO } from "../services/dto/expenseTablesDTO"
import { useTableStore } from "./tableStore"
import SettingsService from "../services/SettingsService"

export const useSettingsStore = create((set, get) => ({
	data: {},
	loading: false,
	state: STATE.SHOW,
	update: () => {
		set({ state: STATE.UPDATE })
	},
	fetch: async () => {
		set({ loading: true })
		const settings = await new Settings().select()
		settings.forEach((el) => {
			set({ data: { ...get().data, [el.slug]: { value: el.value, payload: el.payload } } })
		})

		const tables = useTableStore.getState().tables
		const table = tables.find((table) => table.id === Number(get().data[SETTINGS.DEFAULT_TABLE_ID]?.value))

		if (table) {
			set({
				data: {
					...get().data,
					["default_table_title"]: { value: table.title },
					["default_table_currency"]: { value: table.currency },
					["tables_count"]: { value: tables.length },
				},
			})
		}

		set({ loading: false })
	},
	init: async () => await get().fetch(),
	cancel: async () => {
		await get().fetch()
		set({ state: STATE.SHOW })
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data

		try {
			await ExpenseTablesService.update(
				new ExpenseTablesDTO(
					data[SETTINGS.DEFAULT_TABLE_ID].value,
					data.default_table_title.value,
					data.default_table_currency.value
				)
			)
			await SettingsService.update(data)
			showMessage({ type: "success", message: i18n.t("notification.settings_update_success") })
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.settings_update_error") })
		} finally {
			await useTableStore.getState().fetch()
			set({ state: STATE.SHOW })
			set({ loading: false })
		}
	},
	updateValue: (key, value) => {
		const data = get().data
		set({ data: { ...data, [key]: { ...data[key], value } } })
	},
}))
